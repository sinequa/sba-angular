/**
 * Global test setup, loaded by the `@angular/build:unit-test` builder
 * (see the `setupFiles` option of each `test` target in angular.json).
 */
import { afterEach, beforeEach, vi } from 'vitest';

// Karma loaded polyfill.js for this; some dependencies expect the Node-style
// `global` to be available in the browser/jsdom environment.
(globalThis as unknown as { global: typeof globalThis }).global = globalThis;

/*
 * Under Karma the specs ran in headless Chrome, whose default locale is en-US.
 * Node resolves it from the operating system instead (fr-FR on the dev machines
 * and unspecified on CI), which would make every locale-sensitive expectation
 * environment-dependent. Pin the default so results stay reproducible; the time
 * zone is left untouched, as some specs assert on Europe/Paris.
 */
const DEFAULT_LOCALE = 'en-US';

for (const name of ['Collator', 'DateTimeFormat', 'ListFormat', 'NumberFormat', 'PluralRules', 'RelativeTimeFormat'] as const) {
  const Original = Intl[name] as unknown as (new (...a: unknown[]) => unknown) | undefined;
  if (!Original) continue;

  const Patched = function (locales?: unknown, options?: unknown) {
    return new Original(locales ?? DEFAULT_LOCALE, options);
  } as unknown as typeof Original;

  Patched.prototype = Original.prototype;
  Object.setPrototypeOf(Patched, Original); // keeps supportedLocalesOf & friends
  (Intl as unknown as Record<string, unknown>)[name] = Patched;
}

// jsdom implements no layout, so it omits scrollIntoView entirely. Specs spy on
// it to assert scrolling behaviour, which requires the method to exist first.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() { /* no layout in jsdom */ };
}

/*
 * jsdom ships a `matchMedia` stub that always reports `matches: false`, so
 * UIService finds no matching screen size and throws on construction. Evaluate
 * the width-based queries it relies on against the jsdom viewport instead;
 * anything else (prefers-color-scheme...) keeps the default "no match".
 */
if (typeof window !== 'undefined') {
  const widthOf = (query: string, bound: 'min-width' | 'max-width'): number | undefined => {
    const found = new RegExp(`\\(\\s*${bound}\\s*:\\s*([\\d.]+)px\\s*\\)`).exec(query);
    return found ? Number.parseFloat(found[1]) : undefined;
  };

  window.matchMedia = (query: string): MediaQueryList => {
    const min = widthOf(query, 'min-width');
    const max = widthOf(query, 'max-width');
    const width = window.innerWidth;
    const matches =
      (min !== undefined || max !== undefined) &&
      (min === undefined || width >= min) &&
      (max === undefined || width <= max);

    return {
      matches,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false
    } as MediaQueryList;
  };
}

/*
 * Jasmine restored spies automatically between specs, Vitest does not.
 *
 * This has to happen *before* each spec rather than after: Vitest runs afterEach
 * hooks in reverse registration order, so a hook registered here would run ahead
 * of the TestBed teardown and strip the stubs it still relies on (a stubbed
 * ngOnDestroy would call into the real implementation). Cleaning up on the way in
 * keeps the stubs alive for the whole spec, teardown included — like Jasmine did.
 */
beforeEach(() => {
  vi.restoreAllMocks();
  // Specs faking the system date (previously `jasmine.clock().mockDate()`)
  // must not leak their frozen clock into the following ones.
  vi.useRealTimers();
});

/*
 * `waitForAsync()` (and `fakeAsync()`) require a ProxyZone to be active while
 * the test body runs. zone.js installs one by patching the test framework, but
 * it only knows about Jasmine, Jest and Mocha — not Vitest — so every such spec
 * would fail with "Expected to be running in 'ProxyZone', but it was not found".
 *
 * See https://github.com/angular/angular/issues/66150.
 *
 * The patch below does for Vitest what zone.js does for Jasmine: one ProxyZone
 * per spec, shared by its hooks and its body.
 */
type AnyFn = (...args: unknown[]) => unknown;
type ZoneType = {
  current: { fork(spec: unknown): { run<T>(fn: () => T): T } };
  ProxyZoneSpec?: new () => unknown;
};

const zone = (globalThis as unknown as { Zone?: ZoneType }).Zone;
const ProxyZoneSpec = zone?.ProxyZoneSpec;

if (zone && ProxyZoneSpec) {
  let proxyZone: { run<T>(fn: () => T): T } | undefined;

  // Registered before the specs are collected, so it runs before their own hooks.
  beforeEach(() => {
    proxyZone = zone.current.fork(new ProxyZoneSpec());
  });

  afterEach(() => {
    proxyZone = undefined;
  });

  const runInProxyZone = (fn: AnyFn): AnyFn =>
    function (this: unknown, ...args: unknown[]) {
      // Hooks registered outside a spec (beforeAll) have no zone: run them as-is.
      return proxyZone
        ? proxyZone.run(() => fn.apply(this, args))
        : fn.apply(this, args);
    };

  /** Wraps the callback argument, keeping the helper's own properties (skip, only, each...). */
  const patch = (name: string, callbackIndex: number) => {
    const target = globalThis as unknown as Record<string, AnyFn | undefined>;
    const original = target[name];
    if (typeof original !== 'function') return;

    const patched = function (this: unknown, ...args: unknown[]) {
      const fn = args[callbackIndex];
      if (typeof fn === 'function') {
        args[callbackIndex] = runInProxyZone(fn as AnyFn);
      }
      return original.apply(this, args);
    };

    // `it.each`, `it.skip`, ... are properties of the original function.
    Object.setPrototypeOf(patched, original);
    Object.assign(patched, original);
    target[name] = patched as AnyFn;
  };

  // The spec body is the 2nd argument of it/test, the 1st of the hooks.
  patch('it', 1);
  patch('test', 1);
  patch('beforeEach', 0);
  patch('afterEach', 0);
}
