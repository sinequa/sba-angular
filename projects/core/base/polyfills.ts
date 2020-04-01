import "fast-text-encoding"; // IE 11 / Edge

// NB the name of the intl polyfill (below) conflicts with @sinequa/core/intl in the module resolution.
// Output of traceResolution: true gives the following:
//
// Resolving module name 'intl' relative to base url 'D:/ice/sba/ng-ws/projects/core' - 'D:/ice/sba/ng-ws/projects/core/intl'.
// Loading module as file / folder, candidate module location 'D:/ice/sba/ng-ws/projects/core/intl', target file type 'TypeScript'.
// ...
// This can be worked around in a number of ways:
// 1. Rename the @sinequa/core/intl folder and all references to it (not overly desirable)
// 2. Install the intl polyfill using an alias: npm install my-intl-alias@npm:intl. But then references in the locale files would have
//    to use import "my-intl-alias/..."
// 3. Don't use index.ts as the entry point filename. This is a bit hacky but it works and has the least impact so that's what we've gone with
//    _index.ts is used and referenced in package.json: { "ngPackage": { "lib": { "entryFile": "index.ts" } } }
//    We also put an explicit Path to @sinequa/core/intl => ./intl/_index in the local tsconfig.json so that references to @sinequa/core/intl
//    are resolved correctly in VSCode
import "intl"; // Safari
import "intl/locale-data/jsonp/en-US"; // Locale needed for formatjs initialization (new Intl.NumberFormat())
import "js-polyfills/url";
import "matchmedia-polyfill";
import focusWithin from "focus-within"; // IE 11 / Edge - https://github.com/jonathantneal/focus-within

focusWithin(document);

// String.trimStart, String.trimEnd
if (!(<any>String.prototype).trimStart) {
  (<any>String.prototype).trimStart = function () {
    return this.replace(/^[\s\uFEFF\xA0]+/g, '');
  };
}

if (!(<any>String.prototype).trimEnd) {
  (<any>String.prototype).trimEnd = function () {
    return this.replace(/[\s\uFEFF\xA0]+$/g, '');
  };
}

// See https://gist.github.com/jocki84/6ffafd003387179a988e
if (!(<any>Element.prototype).scrollIntoViewIfNeeded) {
    (<any>Element.prototype).scrollIntoViewIfNeeded = function (centerIfNeeded) {
        function withinBounds(value, min, max, extent) {
            if (false === centerIfNeeded || max <= value + extent && value <= min + extent) {
                return Math.min(max, Math.max(min, value));
            } else {
                return (min + max) / 2;
            }
        }

        function makeArea(left, top, width, height) {
            return  { "left": left, "top": top, "width": width, "height": height
                    , "right": left + width, "bottom": top + height
                    , "translate":
                        function (x, y) {
                            return makeArea(x + left, y + top, width, height);
                        }
                    , "relativeFromTo":
                        function (lhs, rhs) {
                            let newLeft = left, newTop = top;
                            lhs = lhs.offsetParent;
                            rhs = rhs.offsetParent;
                            if (lhs === rhs) {
                                return area;
                            }
                            for (; lhs; lhs = lhs.offsetParent) {
                                newLeft += lhs.offsetLeft + lhs.clientLeft;
                                newTop += lhs.offsetTop + lhs.clientTop;
                            }
                            for (; rhs; rhs = rhs.offsetParent) {
                                newLeft -= rhs.offsetLeft + rhs.clientLeft;
                                newTop -= rhs.offsetTop + rhs.clientTop;
                            }
                            return makeArea(newLeft, newTop, width, height);
                        }
                    };
        }

        let parent, elem = this, area = makeArea(
            this.offsetLeft, this.offsetTop,
            this.offsetWidth, this.offsetHeight);
        while ((parent = elem.parentNode) instanceof HTMLElement) {
            const clientLeft = parent.offsetLeft + parent.clientLeft;
            const clientTop = parent.offsetTop + parent.clientTop;

            // Make area relative to parent's client area.
            area = area.
                relativeFromTo(elem, parent).
                translate(-clientLeft, -clientTop);

            parent.scrollLeft = withinBounds(
                parent.scrollLeft,
                area.right - parent.clientWidth, area.left,
                parent.clientWidth);

            parent.scrollTop = withinBounds(
                parent.scrollTop,
                area.bottom - parent.clientHeight, area.top,
                parent.clientHeight);

            // Determine actual scroll amount by reading back scroll properties.
            area = area.translate(clientLeft - parent.scrollLeft,
                                  clientTop - parent.scrollTop);
            elem = parent;
        }
    };
}

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

  if ( typeof (<any>window).CustomEvent === "function" ) return;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = (<any>window).Event.prototype;

  (<any>window).CustomEvent = CustomEvent;
})();

// IE
if (!window.location.origin) { // Some browsers (mainly IE) do not have this property, so we need to build it manually...
    try {
        window.location[/*foo readonly*/<string>"origin"] = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
    }
    catch (e) {
    }
}

// fake storage (eg for Safari private browsing)
function fakeStorage(storageName: string) {
    let fakeStorage = {};
    let storage;
    let needed = false;

    if (typeof window[storageName] === "object") {
        // Storage is there, does it work (eg Safari private browsing)
        try {
            window[storageName].setItem("fakeStorageTest", "1");
            window[storageName].removeItem("fakeStorageTest");
        }
        catch (e) {
            needed = true;
        }
    }
    else {
        needed = true;
    }

    if (!needed) {
        return;
    }

    if (typeof window[storageName] === "object") {
        // Override with fake implementation
        storage = window[storageName];
    }
    else {
        // Implement with fake
        try {
            storage = window[/*fool readonly*/<string>storageName] = {};
        }
        catch (e) {
            console.warn("Unable to set fake", storageName);
            return;
        }
    }

    console.warn("Using fake", storageName);

    const dispatchStorageEvent = function(key, newValue) {
        const oldValue = (!key) ? null : storage.getItem(key);
        const url = location.href.substr(location.origin.length);
        const storageEvent = document.createEvent("StorageEvent"); // For IE, http://stackoverflow.com/a/25514935/1214183

        storageEvent["initStorageEvent"]("storage", false, false, key, oldValue, newValue, url, storage);
        window.dispatchEvent(storageEvent);
    };

    storage.key = function(i) {
        const key = Object.keys(fakeStorage)[i];
        return typeof key === "string" ? key : null;
    };

    storage.getItem = function(key) {
        return typeof fakeStorage[key] === 'string' ? fakeStorage[key] : null;
    };

    storage.setItem = function(key, value) {
        dispatchStorageEvent(key, value);
        fakeStorage[key] = String(value);
    };

    storage.removeItem = function(key) {
        dispatchStorageEvent(key, null);
        delete fakeStorage[key];
    };

    storage.clear = function() {
        dispatchStorageEvent(null, null);
        fakeStorage = {};
    };
}

fakeStorage("localStorage");
fakeStorage("sessionStorage");

// DOMRect polyfill
// Credit: https://github.com/Financial-Times/polyfill-service/pull/1732
(function(global: any) {
    if (global.DOMRect) {
        return;
    }
    function number(v) {
        return v === undefined ? 0 : Number(v);
    }
    function different(u, v) {
        return u !== v && !(isNaN(u) && isNaN(v));
    }
    function DOMRect(this: DOMRect, xArg, yArg, wArg, hArg) {
        let x; let y; let width; let height; let left; let right; let top; let bottom;
        x = number(xArg);
        y = number(yArg);
        width = number(wArg);
        height = number(hArg);
        Object.defineProperties(this, {
            x: {
                get: function () { return x; },
                set: function (newX) {
                    if (different(x, newX)) {
                        x = newX;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            y: {
                get: function () { return y; },
                set: function (newY) {
                    if (different(y, newY)) {
                        y = newY;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            width: {
                get: function () { return width; },
                set: function (newWidth) {
                    if (different(width, newWidth)) {
                        width = newWidth;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            height: {
                get: function () { return height; },
                set: function (newHeight) {
                    if (different(height, newHeight)) {
                        height = newHeight;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            left: {
                get: function () {
                    if (left === undefined) {
                        left = x + Math.min(0, width);
                    }
                    return left;
                },
                enumerable: true
            },
            right: {
                get: function () {
                    if (right === undefined) {
                        right = x + Math.max(0, width);
                    }
                    return right;
                },
                enumerable: true
            },
            top: {
                get: function () {
                    if (top === undefined) {
                        top = y + Math.min(0, height);
                    }
                    return top;
                },
                enumerable: true
            },
            bottom: {
                get: function () {
                    if (bottom === undefined) {
                        bottom = y + Math.max(0, height);
                    }
                    return bottom;
                },
                enumerable: true
            }
        });
    }
    global.DOMRect = DOMRect;
}(window));

// Element.closest and Element.matches polyfills (see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
if (!Element.prototype.matches) {
    Element.prototype.matches =
        (Element.prototype as any).msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        let el = this;
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode as Element;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

export {
};
