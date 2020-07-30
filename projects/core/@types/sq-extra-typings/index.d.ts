// TextEncoder / TextDecoder
interface TextDecodeOptions {
    stream?: boolean;
}

interface TextDecoderOptions {
    fatal?: boolean;
    ignoreBOM?: boolean;
}

interface TextDecoder {
    /**
     * Returns encoding's name, lowercased.
     */
    readonly encoding: string;
    /**
     * Returns true if error mode is "fatal", and false
     * otherwise.
     */
    readonly fatal: boolean;
    /**
     * Returns true if ignore BOM flag is set, and false otherwise.
     */
    readonly ignoreBOM: boolean;
    /**
     * Returns the result of running encoding's decoder. The
     * method can be invoked zero or more times with options's stream set to
     * true, and then once without options's stream (or set to false), to process
     * a fragmented stream. If the invocation without options's stream (or set to
     * false) has no input, it's clearest to omit both arguments.
     * var string = "", decoder = new TextDecoder(encoding), buffer;
     * while(buffer = next_chunk()) {
     * string += decoder.decode(buffer, {stream:true});
     * }
     * string += decoder.decode(); // end-of-stream
     * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
     */
    decode(input?: BufferSource, options?: TextDecodeOptions): string;
}

declare var TextDecoder: {
    prototype: TextDecoder;
    new(label?: string, options?: TextDecoderOptions): TextDecoder;
};

interface TextEncoder {
    /**
     * Returns "utf-8".
     */
    readonly encoding: string;
    /**
     * Returns the result of running UTF-8's encoder.
     */
    encode(input?: string): Uint8Array;
}

declare var TextEncoder: {
    prototype: TextEncoder;
    new(): TextEncoder;
};

// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
interface Window {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
}

declare module AutoScroller {
    export interface AutoScroll {
        destroy: () => void
    }
        
    export interface AutoScrollerFactory {    
        (elements: Element[], options: any): AutoScroll
    }
}

declare var AutoScroller: AutoScroller.AutoScrollerFactory;

declare module "dom-autoscroller" {
    export = AutoScroller;
}

declare module "diacritics" {
    export function remove(text: string): string;
}

declare module "custom-event" {
    export = CustomEvent;
}

// String.trimStart, String.trimEnd
interface String {
    trimStart(): string;
    trimEnd(): string;
}

interface HTMLElement {
    scrollIntoViewIfNeeded(center: boolean);
}

declare module "textarea-caret";

// For importing json (eg i18n message files)
declare module "*.json";

// For jqwidgets globalization
declare var Globalize;
declare module "jqwidgets-framework/jqwidgets/globalization/globalize" {
    export default Globalize;
}

declare module "focus-within";

// Not in any standard type definitions yet...
declare namespace Intl {
    type RelativeTimeUnit = "year" | "years" | "quarter" | "quarters" | "month" | "months" | "week" | "weeks" |
        "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds";

    interface RelativeTimeFormatOptions {
        localeMatcher?: "lookup" | "best fit";
        numeric?: "always" | "auto";
        style?: "long" | "short" | "narrow";
    }

    class RelativeTimeFormat {
        constructor(locale?: string, options?: RelativeTimeFormatOptions);
        format(value: number, unit: RelativeTimeUnit);
    }
}
