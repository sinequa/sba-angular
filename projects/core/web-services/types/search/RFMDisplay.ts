/**
 * Display kinds for RFM
 */
export enum RFMDisplay {
    // Must be in par with C# RFMDisplay enum (RFM.cs)
    none = 0,

    positiveRate = 1,
    mainlyPosRate = 2,
    unrate = 4,
    mainlyNegRate = 8,
    negativeRate = 16,

    all = 31,
    positiveOnly = 7,
    negativeOnly = 28,

    personalAll = 21,
    personalPosOnly = 5,
    personalNegOnly = 20
}
