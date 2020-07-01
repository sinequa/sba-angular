import {Utils} from "./utils";

/**
 * Defines the different pattern types
 * `Empty`: no pattern
 * `RegExp`: a regular expression pattern
 * `Value`: a literal value
 */
export enum PatternType {
    Empty = 0,
    RegExp = 1,
    // WildCard = 2,
    Value = 3
}

/**
 * A class that represents a single pattern. The pattern type is deduced automatically from the input pattern text.
 *
 * `<empty string>` => `Empty`
 * `<pattern with wildcards ?*>` => `RegExp` (wildcards are converted to regular expressions)
 * `<pattern starting with ~>` => `RegExp` (the text following the ~ character is treated as a regular expression)
 * `<any other value>` => `Value` (a literal value that is matched as-is)
 */
export class Pattern {
    private _type: PatternType;
    public get type(): PatternType {
        return this._type;
    }
    private reg?: RegExp;
    private preparedPattern1?: string;
    // private preparedPattern2: string;
    private _text?: string;
    public get text(): string | undefined {
        return this._text;
    }

    public static getPatternType(pattern: string): PatternType {
        if (!pattern) {
            return PatternType.Empty;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return PatternType.RegExp;
        }
        return PatternType.Value;
    }

    public static isPattern(pattern: string): boolean {
        if (!pattern) {
            return false;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return true;
        }
        return false;
    }

    public static doMatch(pattern: string, text: string): boolean {
        const _pattern = new Pattern();
        _pattern.load(pattern);
        return _pattern.isMatch(text);
    }

    public static wildcardToRegex(pattern: string): string {
        if (!pattern) {
            return pattern;
        }
        return "^" + Utils.regExEscape(pattern).replace("\\*", ".*").replace("\\?", ".") + "$";
    }

    public constructor(pattern?: string) {
        if (!pattern) {
            this.clear();
        }
        else {
            this.load(pattern);
        }
    }

    private static cleanPattern(s: string): string {
        if (!s) {
            return s;
        }
        const sb: string[] = [];
        let lastIsStar = false;
        for (const ch of s) {
            if (ch === "*") {
                if (!lastIsStar) {
                    lastIsStar = true;
                    sb.push(ch);
                }
            }
            else {
                lastIsStar = false;
                sb.push(ch);
            }
        }
        return sb.join("");
    }

    public clear():void {
        this.reg= undefined;
        this._text = undefined;
        this.preparedPattern1 = undefined;
        // this.preparedPattern2 = undefined;
        this._type = PatternType.Empty;
    }

    public isEmpty(): boolean {
        return this._type === PatternType.Empty;
    }

    public load(pattern: string): boolean {
        this.clear();
        try {
            let s = pattern;
            this._text = pattern;
            this._type = Pattern.getPatternType(s);
            if (this._type === PatternType.Empty) {
                return true;
            }
            if (this._type === PatternType.Value) {
                this.preparedPattern1= s ;
                return true;
            }
            if (this._type === PatternType.RegExp) {
                if (s[0] === "~") {
                    s = s.substring(1);
                }
                else {
                    s = Pattern.wildcardToRegex(Pattern.cleanPattern(s));
                }
                this.preparedPattern1 = s;
                this.reg = new RegExp(s, "i");
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(`Pattern.Load '${pattern}' error:`, e);
            this.clear();
            return false;
        }
    }

    public getTypeValueText(): string | undefined {
        if (this.type === PatternType.Value) {
            return this.preparedPattern1;
        }
        return undefined;
    }

    public getTypeRegexPattern(): string | undefined {
        if (this.type === PatternType.RegExp) {
            return this.preparedPattern1;
        }
        return undefined;
    }

    public isTypeValue(): boolean {
        return this.type === PatternType.Value;
    }

    public isMatch(text: string): boolean {
        text = text || "";
        switch (this._type) {
            default:
            case PatternType.Empty:
                return true;
            case PatternType.Value:
                return Utils.eqNC(text, this.preparedPattern1 || "");
            case PatternType.RegExp:
                return this.reg?.test(text) || false;
        }
    }
}

export class Patterns {
    private _text?: string;
    private _preparedPatterns?: Pattern[];
    private _values?: { [key: string]: true; };
    private _isEmpty: boolean;

    constructor(text?: string) {
        this.text = text;
    }

    public clear(): void {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;
    }

    public get text(): string | undefined {
        return this._text;
    }

    public set text(value: string | undefined) {
        if (value === this._text) {
            return;
        }
        this._text = value;
        const l = Utils.split(this._text || "", ";");
        this.innerSetList(l);

    }

    public getTypeCount(type: PatternType): number {
        if (!this._preparedPatterns) {
            return 0;
        }
        if (type === PatternType.Value) {
            return !!this._values ? Object.keys(this._values).length : 0;
        }
        let count = 0;
        for (const pattern of this._preparedPatterns) {
            if (pattern.type === type) {
                count++;
            }
        }
        return count;
    }

    private innerSetList(l: string[] | undefined): void {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;

        if (!!l) {
            for (const s of l) {
                if (!s) {
                    continue;
                }
                const pattern = new Pattern();
                if (pattern.load(s)) {
                    if (!this._preparedPatterns) {
                        this._preparedPatterns = [];
                    }
                    this._preparedPatterns.push(pattern);
                }
            }
        }
        if (this._preparedPatterns) {
            const c = this._preparedPatterns.length;
            if (c > 0) {
                this._isEmpty = false;
            }
            for (let i = c - 1; i >= 0; i--) {
                const pattern = this._preparedPatterns[i];
                //do values
                if (pattern.isTypeValue()) {
                    if (!this._values) {
                        this._values = {};
                    }
                    const val = pattern.getTypeValueText() || "";
                    this._values[val] = true;
                    this._preparedPatterns.splice(i, 1);
                }
            }
        }
    }

    public get list(): string[] {
        return Utils.split(this.text || "", ";");
    }

    public set list(value: string[]) {
        this.text = !!value ? value.join(";") : undefined;
        this.innerSetList(value);
    }

    public setText(list: string[]): void {
        this.list = list;
    }

    public isEmpty(): boolean {
        return this._isEmpty;
    }

    public hasPatterns(): boolean {
        return !this.isEmpty();
    }

    public isMatch(name: string, logdisplay?: string) {
        if (this.isEmpty()) {
            return true;
        }

        if (!!this._values) {
            if (this._values[name]) {
                if (!!logdisplay) {
                    console.log(logdisplay, ` : the pattern '${name}' matches the value '${name}'`);
                }
                return true;
            }
        }

        if (!!this._preparedPatterns) {
            for (const pattern of this._preparedPatterns) {
                if (!pattern) {
                    continue;
                }
                if (pattern.isTypeValue()) {
                    continue;
                }
                if (pattern.isMatch(name)) {
                    if (!!logdisplay) {
                        console.log(logdisplay, ` : the pattern '${pattern.text}' matches the value '${name}'`);
                    }
                    return true;
                }
            }
        }
        return false;
    }
}

/**
 * This class is used to process "included" and "excluded" patterns typically specified in the Sinequa configuration.
 */
export class PatternMatcher {
    public includedPattern: Patterns;
    public excludedPattern: Patterns;

    public get included(): string | undefined {
        return this.includedPattern.text;
    }

    public set included(value: string | undefined) {
        this.includedPattern.text = value;
    }

    public get excluded(): string | undefined {
        return this.excludedPattern.text;
    }

    public set excluded(value: string | undefined) {
        this.excludedPattern.text = value;
    }

    public set includedList(value: string[]) {
        this.includedPattern.list = value;
    }

    public set excludedList(value: string[]) {
        this.excludedPattern.list = value;
    }

    public includedLogDisplay?: string;
    public excludedLogDisplay?: string;

    constructor(includedLogDisplay?: string, excludedLogDisplay?: string) {
        this.includedPattern = new Patterns();
        this.excludedPattern = new Patterns();
        this.includedLogDisplay = includedLogDisplay;
        this.excludedLogDisplay = excludedLogDisplay;
    }

    public hasPatterns(): boolean {
        return this.includedPattern.hasPatterns() || this.excludedPattern.hasPatterns();
    }

    public isExcluded(name: string): boolean {
        return !this.isIncluded(name);
    }

    public isIncluded(name: string): boolean {
        if (!name) {
            return true;
        }
        if (this.includedPattern.hasPatterns()) {
            if (this.excludedPattern.hasPatterns()) {
                if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                    return false;
                }
            }
            if (!this.includedPattern.isMatch(name, this.includedLogDisplay)) {
                return false;
            }
            return true;
        }
        else if (this.excludedPattern.hasPatterns()) {
            if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                return false;
            }
            return true;
        }
        return true;
    }

    public isExplicitlyIncluded(name: string): boolean {
        return this.includedPattern.hasPatterns() && this.includedPattern.isMatch(name, this.includedLogDisplay);
    }

    public isExplicitlyExcluded(name: string): boolean {
        return this.excludedPattern.hasPatterns() && this.excludedPattern.isMatch(name, this.excludedLogDisplay);
    }
}
