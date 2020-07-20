import {Injectable, Inject, OnDestroy} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Utils, MapOf, PatternMatcher} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {FormatService} from "./format.service";
import {AppWebService, AuditEvents, START_CONFIG, StartConfig,
    CCApp, CCQuery, CCLabels, CCAutocomplete, CCColumn, CCIndex, CCWebService, CCConfig, CCList, CCAggregation,
    EngineType, EngineTypeModifier, MINIMUM_COMPATIBLE_SERVER_API_VERSION} from "@sinequa/core/web-services";
import {ExprParser, ExprParserOptions, Expr} from "./query/expr-parser";
import {AppServiceHelpers} from "./app-service-helpers";

/**
 * A base event from which all events that can be issued by the {@link AppService} are derived
 */
export interface AppEvent {
    type: "query-changed";
}

/**
 * This event is fired each time the [ccquery]{@link AppService#ccquery} member is modified.
 */
export interface QueryChangedEvent extends AppEvent {
    type: "query-changed";
    current?: CCQuery;
    previous?: CCQuery;
}

/**
 * A union of the different events that the {@link AppService} can generate
 */
export type AppEvents = QueryChangedEvent;

/**
 * A service to manage the Sinequa SBA configuration
 */
@Injectable({
    providedIn: "root"
})
export class AppService implements OnDestroy {
    // Should match AdditionalQueryableColumns in Engine.cs
    private static extraColumns: MapOf<CCColumn> = {
        id: AppService.makeColumn("id", "string"),
        text: AppService.makeColumn("text", "varchar"),
        documentlanguages: AppService.makeColumn("documentlanguages", "csv", "ci"),
        databasealias: AppService.makeColumn("databasealias", "varchar"),
        globalrelevance: AppService.makeColumn("globalrelevance", "double"),
        matchingpartnames: AppService.makeColumn("matchingpartnames", "csv"),
        matchlocations: AppService.makeColumn("matchlocations", "csv"),
        matchlocationsperpartname: AppService.makeColumn("matchlocationsperpartname", "varchar"), // json
        extracts: AppService.makeColumn("extracts", "csv"),
        extractsperpartname: AppService.makeColumn("extractsperpartname", "varchar"), // json
        extractslocations: AppService.makeColumn("extractslocations", "csv"),
        documentweight: AppService.makeColumn("documentweight", "varchar"),
        groupcount: AppService.makeColumn("groupcount", "integer"),
        accesslists: AppService.makeColumn("accesslists", "varchar", undefined, ["accessLists"]) // json
    };

    /**
     * The app configuration
     */
    app?: CCApp;
    /**
     * The labels configuration
     */
    cclabels?: CCLabels;
    /**
     * The autocomplete configuration
     */
    ccautocomplete?: CCAutocomplete;
    /**
     * The suggest queries configured on the application
     */
    suggestQueries: string[];
    private columnsByQuery: MapOf<MapOf<CCColumn>>;
    private columnsByIndex: MapOf<MapOf<CCColumn>>;
    private fieldsByQuery: MapOf<string[]>;
    private _defaultCCQuery?: CCQuery;
    private _ccquery?: CCQuery;

    protected _events = new Subject<AppEvents>();

    private static toEngineType(type: string): EngineType {
        if (!type) {
            return EngineType.none;
        }
        switch (Utils.toLowerCase(type)) {
            case "bool"     :
            case "boolean"  : return EngineType.bool;
            case "date"     : return EngineType.date;
            case "datetime" : return EngineType.dateTime;
            case "time"     : return EngineType.time;
            case "unsigned" : return EngineType.unsigned;
            case "integer"  : return EngineType.integer;
            case "float"    : return EngineType.float;
            case "double"   : return EngineType.double;
            case "dates"    : return EngineType.dates;
            case "datetimes": return EngineType.dateTimes;
            case "times"    : return EngineType.times;
            case "varchar"  : return EngineType.varchar;
            case "binary"   : return EngineType.binary;
            case "string"   : return EngineType.string;
            case "csv"      : return EngineType.csv;
            default         : return EngineType.none;
        }
    }

    private static toEngineTypeModifierSimple(c: string): EngineTypeModifier {
        switch (c) {
            case 'a': return EngineTypeModifier.a;
            case 'c': return EngineTypeModifier.c;
            case 'd': return EngineTypeModifier.d;
            case 'e': return EngineTypeModifier.e;
            case 'i': return EngineTypeModifier.i;
            case 'l': return EngineTypeModifier.l;
            case 'n': return EngineTypeModifier.n;
            case 't': return EngineTypeModifier.t;
            case 'x': return EngineTypeModifier.x;
            case 'z': return EngineTypeModifier.z;
            default : return EngineTypeModifier.none;
        }
    }

    private static toEngineTypeModifier(eType: EngineType, typeModifier: string): EngineTypeModifier {
        let etm = EngineTypeModifier.none;
        if (typeModifier) {
            for (const c of typeModifier) {
                /*tslint:disable-next-line*/
                etm |= AppService.toEngineTypeModifierSimple(c);
            }
        }
        return etm;
    }

    private static makeColumn(name: string, type: string, typeModifier?: string, aliases?: string[]) {
        const eType = AppService.toEngineType(type);
        const eTypeModifier = AppService.toEngineTypeModifier(eType, typeModifier || "");
        return {
            name,
            type,
            typeModifier,
            eType,
            eTypeModifier,
            aliases
        };
    }

    /**
     * Return `true` if a `column` is a string
     */
    static isString(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isString(column);
    }

    /**
     * Return `true` if a `column` is a csv
     */
    static isCsv(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isCsv(column);
    }

    /**
     * Return `true` if a `column` is a tree
     */
    static isTree(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isTree(column);
    }

    /**
     * Return `true` if a `column` is an entity
     */
    static isEntity(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isEntity(column);
    }

    /**
     * Return `true` if a `column` is a boolean
     */
    static isBoolean(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isBoolean(column);
    }

    /**
     * Return `true` if a `column` is a date
     */
    static isDate(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isDate(column);
    }

    /**
     * Return `true` if a `column` is a double
     */
    static isDouble(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isDouble(column);
    }

    /**
     * Return `true` if a `column` is an integer
     */
    static isInteger(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isInteger(column);
    }

    /**
     * Return `true` if a `column` is a number (integer or double)
     */
    static isNumber(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isNumber(column);
    }

    /**
     * Return `true` if a `column` is a scalar
     */
    static isScalar(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isScalar(column);
    }

    /**
     * Return `true` if a `column` is sortable
     */
    static isSortable(column: CCColumn | undefined): boolean {
        return AppServiceHelpers.isSortable(column);
    }

    constructor(
        @Inject(START_CONFIG) public startConfig: StartConfig,
        public appWebService: AppWebService,
        public intlService: IntlService,
        public formatService: FormatService) {

        if (!this.appName) {
            console.error("Missing app name!");
        }
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * Return an `Observable` stream of the events that the `AppService` can generate
     */
    get events(): Observable<AppEvents> {
        return this._events;
    }

    /**
     * Return the name of the SBA
     */
    get appName(): string {
        /*tslint:disable-next-line*/
        return this.startConfig.app!;
    }

    /**
     * Return the origin of the Sinequa server
     */
    get origin(): string {
        /*tslint:disable-next-line*/
        return this.startConfig.origin!;
    }

    private initDefaultQuery() {
        if (!this.app) {
            console.warn("No app configured");
            return;
        }
        // If not set explicitly, the default query is the first in the list
        const defaultQueryName = this.app.defaultQueryName || Utils.split(this.app.queryNames, ",")[0];
        this._defaultCCQuery = Utils.getField<CCQuery>(this.app.queries, defaultQueryName);
        if (!this._defaultCCQuery) {
            console.warn(`Query not configured for app: ${this.appName}`);
        }
        this.ccquery = this._defaultCCQuery;
    }

    private setApp(app: CCApp) {
        this.app = app;
        this.verifyServerApiVersionCompatibility(app);
        this.cclabels = this.getWebService<CCLabels>(this.app.labels);
        this.ccautocomplete = this.getWebService<CCAutocomplete>(this.app.autocomplete);
        this.initDefaultQuery();
        this.makeMaps();
        this.suggestQueries = Utils.split(this.ccautocomplete ? this.ccautocomplete.suggestQueries : "", ",");
    }

    private verifyServerApiVersionCompatibility(app: CCApp): void {
        if (!app) {
            console.warn('Unexpected empty app configuration.');
            return;
        }
        if (!app.apiVersion) {
            console.error(`The App config '${app.name}' is not of 'Angular Workspace application' type.`);
        } else if (app.apiVersion !== MINIMUM_COMPATIBLE_SERVER_API_VERSION) {
            console.warn(`This SBA is not compatible with the REST API of Sinequa Server.\n` +
                `The SBA expects the server API version to be at least '${MINIMUM_COMPATIBLE_SERVER_API_VERSION}',` +
                ` whereas the server API version is '${app.apiVersion}'.`);
        }
    }

    /**
     * Initialize this service by retrieving the current application
     * configuration from the Sinequa server and using it to set up the data structures
     * on which the service relies
     */
    init(): Observable<CCApp> {
        const observable = this.appWebService.get();
        observable.subscribe(
            app => {
                this.setApp(app);
                return app;
            }
        );
        return observable;
    }

    /**
     * Initialize this service from an application configuration object. This is typically
     * used for supporting mutiple concurrent queries within the same application by providing
     * component level instances of this service.
     */
    initFromApp(app: CCApp) {
        if (app) {
            this.setApp(app);
        }
    }

    /**
     * Refresh the application configuration, reinitializing the service if it has changed
     *
     * @param auditEvents Any associated audit events that should be stored
     */
    refresh(auditEvents?: AuditEvents): Observable<CCApp | undefined> {
        const observable = this.appWebService.refresh(this.app ? this.app.versionId : "", auditEvents);
        observable.subscribe(
            response => {
                if (!response.upToDate && response.app) {
                    this.setApp(response.app);
                }
                return response;
            }
        );
        return observable.pipe(map((value) => {
            return this.app;
        }));
    }

    /**
     * Clear the data associated with the service. Typically used when processing a user logout
     */
    clear() {
        this.app = undefined;
        this.cclabels = undefined;
        this._defaultCCQuery = undefined;
        this.ccquery = undefined;
        this.clearMaps();
    }

    private indexIsNormal(ccindex: CCIndex): boolean {
        return !!ccindex && (!ccindex.indexType || Utils.startsWith(ccindex.indexType, "normal"));
    }

    private getIndexForQuery(ccquery: CCQuery): CCIndex | undefined {
        if (!ccquery) {
            return undefined;
        }
        const indexes = Utils.split(ccquery.searchIndexes, [","]);
        if (indexes.length === 0) {
            return this.app ? this.app.indexes._ : undefined;
        }
        else {
            const ccindex = this.getIndex(indexes[0]);
            if (ccindex && this.indexIsNormal(ccindex)) {
                return this.app ? this.app.indexes._ : undefined;
            }
            return ccindex;
        }
    }

    private _makeColumnMapForIndex(columnMap: MapOf<CCColumn>, ccindex: CCIndex) {
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnName of Object.keys(ccindex.columns)) {
            const column = ccindex.columns[columnName];
            columnMap[Utils.toLowerCase(column.name)] = column;
            if (column.aliases) {
                for (const alias of column.aliases) {
                    columnMap[Utils.toLowerCase(alias)] = column;
                }
            }
        }
    }

    private _makeColumnMapForQuery(columnMap: MapOf<CCColumn>, ccquery: CCQuery) {
        if (!ccquery || !ccquery.columnsInfo || !ccquery.columnsInfo.columns) {
            return;
        }
        const ccindex = this.getIndexForQuery(ccquery);
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnInfo of ccquery.columnsInfo.columns) {
            if (columnInfo.name) {
                const columnName = Utils.toLowerCase(columnInfo.name);
                let column = ccindex.columns[columnName];
                if (!column) {
                    column = AppService.extraColumns[columnName];
                }
                if (column) {
                    // Copy column so we can add the query specific aliases and labels
                    column = Utils.copy(column);
                    columnMap[columnName] = column;
                    if (columnInfo.aliases) {
                        column.aliases = Utils.split(columnInfo.aliases, [",", ";"]);
                        for (const alias of column.aliases) {
                            columnMap[Utils.toLowerCase(alias)] = column;
                        }
                    }
                    // Overwrite labels if defined on the query
                    if (columnInfo.label) {
                        column.label = columnInfo.label;
                    }
                    if (columnInfo.labelPlural) {
                        column.labelPlural = columnInfo.labelPlural;
                    }
                    if (columnInfo.formatter) {
                        column.formatter = columnInfo.formatter;
                    }
                    if (columnInfo.transforms) {
                        column.transforms = columnInfo.transforms;
                    }
                    if (columnInfo.parser) {
                        column.parser = columnInfo.parser;
                    }
                    if (columnInfo.description) {
                        column.description = columnInfo.description;
                    }
                }
            }
        }
    }

    protected makeMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
        if (!this.app) {
            return;
        }
        let columnMap: MapOf<CCColumn>;

        // Queries
        if (this.app.queries) {
            for (const queryName of Object.keys(this.app.queries)) {
                const ccquery = this.app.queries[queryName];
                if (ccquery) {
                    ccquery.$columnFieldsPattern = new PatternMatcher("included column fields", "excluded column fields");
                    ccquery.$columnFieldsPattern.includedPattern.setText(ccquery.columnFieldsIncluded);
                    ccquery.$columnFieldsPattern.excludedPattern.setText(ccquery.columnFieldsExcluded);
                    ccquery.$partnameFieldsPattern = new PatternMatcher("included part name fields", "excluded part name fields");
                    ccquery.$partnameFieldsPattern.includedPattern.setText(ccquery.partnameFieldsIncluded);
                    ccquery.$partnameFieldsPattern.excludedPattern.setText(ccquery.partnameFieldsExcluded);
                    if (ccquery.columnsInfo) {
                        columnMap = {};
                        this.columnsByQuery[Utils.toLowerCase(ccquery.name)] = columnMap;
                        this._makeColumnMapForQuery(columnMap, ccquery);
                    }
                }
            }
        }

        // Indexes
        if (this.app.indexes) {
            // Special normal index
            const ccindex = this.app.indexes._;
            if (ccindex) {
                columnMap = {};
                this.columnsByIndex._ = columnMap;
                this._makeColumnMapForIndex(columnMap, ccindex);

            }
            for (const indexName of Object.keys(this.app.indexes)) {
                const ccindex1 = this.app.indexes[Utils.toLowerCase(indexName)];
                if (ccindex1) {
                    if (this.indexIsNormal(ccindex1)) {
                        if (ccindex1.name !== "_") {
                            this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = this.columnsByIndex._;
                        }
                    }
                    else {
                        columnMap = {};
                        this.columnsByIndex[Utils.toLowerCase(ccindex1.name)] = columnMap;
                        this._makeColumnMapForIndex(columnMap, ccindex1);
                    }
                }
            }
        }

        // Fields per query (contains aliases for default query and globally defined aliases)
        const globalFields = new Map<string, string>();
        const columns = this.columnsByIndex._;
        if (columns) {
            for (const key of Object.keys(columns)) {
                const column = columns[key];
                if (column.aliases && column.aliases.length > 0) {
                    const alias = column.aliases[0];
                    if (alias) {
                        globalFields.set(alias, alias);
                    }
                }
            }
        }
        for (const queryName of Object.keys(this.columnsByQuery)) {
            const queryFields = new Map<string, string>(globalFields);
            const columns1 = this.columnsByQuery[Utils.toLowerCase(this.defaultCCQuery ? this.defaultCCQuery.name : "")];
            if (columns1) {
                for (const key of Object.keys(columns1)) {
                    const column = columns1[key];
                    if (column.aliases && column.aliases.length > 0) {
                        const alias = column.aliases[0];
                        if (alias) {
                            queryFields.set(alias, alias);
                        }
                    }
                }
                this.fieldsByQuery[queryName] = Array.from(queryFields.keys());
            }
        }
    }

    protected clearMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
    }

    /**
     * Get the configuration of the web service with the passed name
     */
    getWebService<T extends CCWebService>(name: string): T | undefined {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField<CCConfig>(this.app.webServices, name) as T;
    }

    /**
     * Get the list configuration with the passed name
     */
    getList(name: string): CCList | undefined {
        if (!this.app) {
            return undefined;
        }
        return this.app.lists[name];
    }

    /**
     * Return the default {@link CCQuery}
     */
    get defaultCCQuery(): CCQuery | undefined {
        return this._defaultCCQuery;
    }

    /**
     * Return the current {@link CCQuery}
     */
    get ccquery(): CCQuery | undefined {
        if (!!this._ccquery) {
            return this._ccquery;
        }
        return this._defaultCCQuery;
    }

    /**
     * Set the current {@link CCQuery}
     */
    set ccquery(value: CCQuery | undefined) {
        if (value !== this._ccquery) {
            const previous = this._ccquery;
            this._ccquery = value;
            this._events.next({type: "query-changed", current: this._ccquery, previous: previous});
        }
    }

    /**
     * Get the {@link CCQuery} with the passed name
     */
    getCCQuery(name: string): CCQuery | undefined {
        return this.app ? this.app.queries[Utils.toLowerCase(name)] : undefined;
    }

    /**
     * Set the current {@link CCQuery} to that with the passed name
     */
    setCCQuery(name?: string): boolean {
        const ccquery = !name ? this.defaultCCQuery : this.getCCQuery(name);
        if (ccquery) {
            this.ccquery = ccquery;
            return true;
        }
        else {
            console.warn(`AppService.setCCQuery - query '${name}' does not exist`);
            return false;
        }
    }

    /**
     * Return the fields defined on the current {@link CCQuery}
     */
    get fields(): string[] {
        if (!this.ccquery) {
            return [];
        }
        return this.fieldsByQuery[Utils.toLowerCase(this.ccquery.name)] || [];
    }

    /**
     * Get the {@link CCAggregation} with the passed name
     */
    getCCAggregation(name: string): CCAggregation | undefined {
        if (!this.ccquery || !this.ccquery.aggregations) {
            return undefined;
        }
        return this.ccquery.aggregations.find((value) => Utils.eqNC(name, value.name));
    }

    /**
     * Get the {@link CCIndex} with the passed name
     */
    getIndex(name: string): CCIndex | undefined {
        if (!this.app) {
            return undefined;
        }
        return Utils.getField<CCIndex>(this.app.indexes, name);
    }

    /**
     * Get the {@link CCColumn} with the passed name. Aliases are resolved
     */
    getColumn(name: string | null | undefined): CCColumn | undefined {
        if (!name) {
            return undefined;
        }
        if (!this.ccquery) {
            return undefined;
        }
        // First, CCQuery specific aliases
        let column: CCColumn;
        let columnAliases = this.columnsByQuery[Utils.toLowerCase(this.ccquery.name)];
        if (columnAliases) {
            column = columnAliases[Utils.toLowerCase(name)];
            if (column) {
                return column;
            }
        }
        // Second, aliases by index
        const indexes = Utils.split(this.ccquery.searchIndexes, [","]);
        const firstIndex = indexes.length === 0 ? undefined : this.getIndex(indexes[0]);
        if (indexes.length === 0 || (!!firstIndex && this.indexIsNormal(firstIndex))) {
            columnAliases = this.columnsByIndex._;
            if (columnAliases) {
                column = columnAliases[Utils.toLowerCase(name)];
                if (column) {
                    return column;
                }
            }
        }
        else {
            for (const index of indexes) {
                columnAliases = this.columnsByIndex[Utils.toLowerCase(index)];
                if (columnAliases) {
                    column = columnAliases[Utils.toLowerCase(name)];
                    if (column) {
                        return column;
                    }
                }
            }
        }
        // Third, extra columns
        column = AppService.extraColumns[Utils.toLowerCase(name)];
        if (column) {
            return column;
        }
        return undefined;
    }

    /**
     * Get the default alias a column
     *
     * @param column The column
     * @return The default alias or `null` if no alias is defined
     */
    getColumnDefaultAlias(column?: CCColumn): string {
        if (column) {
            if (column.aliases && column.aliases.length > 0) {
                return column.aliases[0];
            }
        }
        return "";
    }

    /**
     * Get the name of a column
     *
     * @param column The column
     * @param _default A default name to return if `column` is empty
     */
    private getColumnName(column?: CCColumn, _default = ""): string {
        if (column) {
            return column.name;
        }
        return _default;
    }

    /**
     * Get the default alias for a column
     *
     * @param column The column
     * @param _default A default alias name to return if the `column` is empty or no alias is defined
     */
    getColumnAlias(column?: CCColumn, _default = ""): string {
        if (column) {
            const alias = this.getColumnDefaultAlias(column);
            if (alias) {
                return alias;
            }
        }
        return _default;
    }

    /**
     * Return a column name from a name which can be an alias
     */
    resolveColumnName(name: string | null | undefined): string {
        const column = this.getColumn(name);
        return this.getColumnName(column, name || "");
    }

    /**
     * Return a column alias from a name which can be an alias
     */
    resolveColumnAlias(name: string | null | undefined): string {
        const column = this.getColumn(name);
        return this.getColumnAlias(column, name || "");
    }

    /**
     * Parse a fielded search expression
     *
     * @param text The expression
     * @param options Options for the parsing
     * @return The parsed {@link Expr} or an error message
     */
    parseExpr(text: string, options?: ExprParserOptions): Expr | string {
        return ExprParser.parse(text, {appService: this, formatService: this.formatService, intlService: this.intlService}, options);
    }

    /**
     * Escape a value for fielded search if necessary. `Date` objects are converted to
     * Sinequa system date strings and non-scalars fields are escaped
     * @param field The value's field
     * @param value The value
     */
    escapeFieldValue(field: string, value: string | number | Date | boolean | undefined): string {
        if (Utils.isDate(value)) {
            return Utils.toSysDateStr(value);
        }
        value = value + "";
        const column = this.getColumn(field);
        if (column && !AppService.isScalar(column)) {
            // escaoe columns that might contain search operators in them (treating negative numbers as an ignorable edge case)
            return ExprParser.escape(value);
        }
        return value;
    }

    /**
     * Get the label of a column. The plural label is returned for csv-type columns.
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getLabel(name: string, _default?: string): string {
        const column = this.getColumn(name);
        if (column) {
            const label = AppService.isCsv(column) ? column.labelPlural : column.label;
            if (label) {
                return label;
            }
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }

    /**
     * Get the singular label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getSingularLabel(name: string, _default?: string): string {
        const column = this.getColumn(name);
        if (column && column.label) {
            return column.label;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }

    /**
     * Get the plural label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getPluralLabel(name: string, _default?: string): string {
        const column = this.getColumn(name);
        if (column && column.labelPlural) {
            return column.labelPlural;
        }
        if (!Utils.isUndefined(_default)) {
            return _default;
        }
        return name;
    }

    /**
     * Return `true` if a column with the passed name or alias is a string
     */
    isString(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isString(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a csv
     */
    isCsv(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isCsv(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a tree
     */
    isTree(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isTree(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is an entity
     */
    isEntity(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isEntity(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a boolean
     */
    isBoolean(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isBoolean(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a date
     */
    isDate(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isDate(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a double
     */
    isDouble(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isDouble(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is an integer
     */
    isInteger(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isInteger(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is a number (integer or double)
     */
    isNumber(name: string): boolean {
        return this.isInteger(name) || this.isDouble(name);
    }

    /**
     * Return `true` if a column with the passed name or alias is a scalar
     */
    isScalar(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isScalar(column);
    }

    /**
     * Return `true` if a column with the passed name or alias is sortable
     */
    isSortable(name: string): boolean {
        const column = this.getColumn(name);
        return !!column && AppService.isSortable(column);
    }

    /**
     * If the passed url is relative and CORS is active then
     * prepend it with the Sinequa server origin
     */
    updateUrlForCors(url: string): string {
        if (this.startConfig.corsActive && !!url && !Utils.isUrlAbsolute(url)) {
            url = Utils.addUrl(this.origin, url);
        }
        return url;
    }

    /**
     * Return the url to the Sinequa administration console
     */
    get adminUrl(): string {
        /*tslint:disable-next-line*/
        return this.updateUrlForCors(Utils.addUrl(this.startConfig.applicationPath!, "admin"));
    }
}