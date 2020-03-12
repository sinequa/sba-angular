import {Utils} from "./utils";

/**
 * Describes the error codes that can be set in the {@link SqError} class.
 */
export enum SqErrorCode {
    loginCancelled,
    processedCredentialsError,
    principalSwitched,
    autoLoginError
}

/**
 * A subclass of the built-in {@link Error} class with added `code` and
 * `data` (optional) properties.
 */
export class SqError extends Error {
    // See https://github.com/Microsoft/TypeScript/issues/7639
    // and https://github.com/Microsoft/TypeScript/issues/1168#issuecomment-107833988
    /**
     * The error code associated with the error.
     */
    code: SqErrorCode;
    /**
     * Arbitrary data associated with the error.
     */
    data: any;

    constructor(code: SqErrorCode, message?: string, data?: any) {
        super(message || SqError.message(code));
        this.code = code;
        this.name = "SqError";
        this.message = message || SqError.message(code);
        if (data) {
            this.data = data;
        }
    }

    /**
     * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
     * If the optional `code` parameter is defined then only return true
     * if the code on `error` matches this value.
     */
    static is(error: any, code?: SqErrorCode): error is SqError {
        if (error instanceof SqError || (error instanceof Error && error.name === "SqError")) {
            return Utils.isUndefined(code) || (error as SqError).code === code;
        }
        return false;
    }

    /**
     * Return the message corresponding to the passed error `code`.
     */
    static message(code: SqErrorCode) {
        switch (code) {
            case SqErrorCode.loginCancelled: return "msg#error.loginCancelled";
            case SqErrorCode.processedCredentialsError: return "msg#error.processedCredentialsError";
            case SqErrorCode.principalSwitched: return "msg#error.principalSwitched";
            case SqErrorCode.autoLoginError: return "msg#error.autoLoginError";
            default: return "msg#error.unknownError";
        }
    }
}
