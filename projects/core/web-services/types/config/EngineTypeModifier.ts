/**
 * Defines the type modifiers that can be used for a column
 */


export enum EngineTypeModifier {
    none = 0,
    a = 2053,

    // b  = 0x0000002,
    c = 4,
    d = 8,
    e = 2068,



    // f  = 0x0000020,
    // g  = 0x0000040,
    // h  = 0x0000080,
    i = 256,
    // j  = 0x0000200,
    // k  = 0x0000400,
    l = 2052,

    // m  = 0x0001000,
    n = 8192,
    // o  = 0x0004000,
    // p  = 0x0008000,
    // q  = 0x0010000,
    // r  = 0x0020000,
    // s  = 0x0040000,
    t = 524292,



    // u  = 0x0100000,
    // v  = 0x0200000,
    // w  = 0x0400000,
    x = 8388608,
    // y  = 0x1000000,
    z = 33554432,

    f_ordinal = 8192,
    f_multidates = 8192,
    f_varchar = 33554432,
    f_binary = 33562624,
    f_string = 33562888,
    f_csv = 42477853,

    f_overridable = 33554696 //     d   i         z
}
