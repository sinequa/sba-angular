/**
 * Makes the Vitest globals (`describe`, `it`, `expect`, `vi`, ...) known to
 * TypeScript. The builder runs Vitest with `globals: true`, so specs use them
 * without importing anything.
 *
 * This is imported rather than declared through `compilerOptions.types`:
 * `types` entries are looked up as type packages and cannot resolve the
 * "vitest/globals" subpath, whereas a plain import resolves the file directly.
 */
import 'vitest/globals';
