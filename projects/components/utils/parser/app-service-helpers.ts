import {CCColumn, EngineType, EngineTypeModifier} from "@sinequa/core/web-services";

/**
 * @ignore
 *
 * Used internally to avoid circular references between ExprParser, AppService and FormatService.
 * Do not export from the app-utils module.
 */
export class AppServiceHelpers {
    static isString(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.string) {
            return true;
        }
        if (column.eType === EngineType.csv && (column.eTypeModifier & EngineTypeModifier.x) === EngineTypeModifier.x) {
            return true;
        }
        return false;
    }

    static isCsv(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.csv && (column.eTypeModifier & EngineTypeModifier.x) !== EngineTypeModifier.x) {
            return true;
        }
        return false;
    }

    static isTree(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.csv && (column.eTypeModifier & EngineTypeModifier.t) === EngineTypeModifier.t) {
            return true;
        }
        return false;
    }

    static isEntity(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.csv && (column.eTypeModifier & (EngineTypeModifier.e | EngineTypeModifier.l)) === (EngineTypeModifier.e | EngineTypeModifier.l)) {
            return true;
        }
        return false;
    }

    static isBoolean(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.bool) {
            return true;
        }
        return false;
    }

    static isDate(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.date || column.eType === EngineType.dateTime || column.eType === EngineType.time) {
            return true;
        }
        return false;
    }

    static isDouble(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.double || column.eType === EngineType.float) {
            return true;
        }
        return false;
    }

    static isInteger(column: CCColumn | undefined): boolean {
        if (!column) {
            return false;
        }
        if (column.eType === EngineType.integer || column.eType === EngineType.unsigned) {
            return true;
        }
        return false;
    }

    static isNumber(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isInteger(column) || AppServiceHelpers.isDouble(column);
    }

    static isScalar(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isNumber(column) || AppServiceHelpers.isDate(column) || AppServiceHelpers.isBoolean(column);
    }

    static isSortable(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isString(column) || AppServiceHelpers.isScalar(column) ||
            (AppServiceHelpers.isCsv(column) && !!column && ((column.eTypeModifier & EngineTypeModifier.l) === EngineTypeModifier.l));
    }
}
