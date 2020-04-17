import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalButton, ModalResult } from "@sinequa/core/modal";
import { UserSettingsWebService } from "@sinequa/core/web-services";
import { MapOf, Utils } from "@sinequa/core/base";
import { IntlService } from "@sinequa/core/intl";
import { Validator } from "@sinequa/core/validation";

export module JsonInfo {
    export interface Entry {
        type: string;
        path: string;
        valueType: string;
        label: string;
        list?: string;
        pattern?: string;
        min?: number | Date;
        max?: number | Date;
        validators?: Validator[];
    }

    export enum InputType {
        Entry = 'JsonEntryInput',
        Range = 'JsonRangeInput',
        MultiEntry = 'JsonMultiEntryInput',
    }

    export enum ValueType {
        String = 'String',
        Int = 'Int',
        Number = 'Number',
        Date = 'Date',
        Bool = 'Bool',
    }

    export interface EntryInput extends Entry {
        type: InputType.Entry;
    }

    export interface RangeInput extends Entry {
        type: InputType.Range;
    }

    export interface MultiEntryInput extends Entry {
        type: InputType.MultiEntry;
        distinct?: boolean;
        nbVisibleLines?: number;
    }
}

/**
 * Opens a dialog to modify the user settings.
 *
 */
@Component({
    selector: 'sq-edit-user-settings',
    templateUrl: './edit-user-settings.html'
})
export class BsEditUserSettings implements OnInit {

    @Input() visibleThreshold = 0;
    @Input() showUILanguageSelector?: boolean;

    public model: MapOf<any>;
    public layout: MapOf<JsonInfo.Entry>;
    public form: FormGroup;
    public buttons: ModalButton[];

    constructor(
        private userSettingsService: UserSettingsWebService,
        private intlService: IntlService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.layout = {};
        this.model = {
            'language': this.intlService.currentLocale.name
        };
        this.form = this.formBuilder.group({
            'selectedLocale': [this.intlService.currentLocale.name]
        });

        const onOkClicked = (_) => {
            if (this.form.dirty) {
                // Locale is treated separately because it is not really stored in the user settings.
                const newLocale = this.form.value['selectedLocale'];
                this.form.removeControl('selectedLocale');
                if (!Utils.eqNC(this.model['language'], newLocale)) {
                    Utils.subscribe(
                        this.intlService.use(newLocale),
                        response => console.log('editUserSettings UI language changed.')
                    );
                }

                const patch = this.calculatePatch();
                if (!Utils.isUndefined(patch) && !Utils.isEmpty(patch)) {
                    const observable = this.userSettingsService.patch(patch);
                    Utils.subscribe(
                        observable,
                        response => {
                            if (this.userSettingsService.userSettings) {
                                this.setNewValue(this.userSettingsService.userSettings, patch);
                            }
                            console.log('editUserSettings saved.');
                        },
                        error => console.log('editUserSettings save failed: ', error)
                    );
                }
            }
        };

        this.buttons = [
            new ModalButton({
                result: ModalResult.OK,
                primary: true,
                validation: this.form as any,
                action: onOkClicked
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    private setNewValue(obj: MapOf<any>, newObj: MapOf<any>): void {
        for (const key of Object.keys(newObj)) {
            const value = newObj[key];
            if (value === null) {
                /* NOTE: Don't use delete obj[key] because some component may put an observer on the user settings property */
                obj[key] = undefined;
            }
            else if (Utils.isObject(value)) {
                if (Utils.isDate(value)) {
                    obj[key] = new Date(value.valueOf());
                }
                else if (Utils.isRegExp(value)) {
                    obj[key] = new RegExp(value);
                }
                else if (Utils.isArray(value)) {
                    obj[key] = value.slice(0); // clone the array
                }
                else {
                    if (!Utils.isObject(obj[key])) {
                        obj[key] = Utils.isArray(value) ? [] : {};
                    }
                    this.setNewValue(obj[key], value);
                }
            }
            else {
                obj[key] = value;
            }
        }
    }

    /**
     * Calculates the update patch for user settings.
     *
     * @returns the update patch.
     */
    private calculatePatch(): MapOf<any> {
        const patch = {};
        Object.keys(this.form.value).forEach(key => {
            const formValue = this.ensureType(this.layout[key], this.readFormValue(key));
            const paths = Utils.split(this.layout[key].path, '.');
            const currentValue = this.userSettingsService.readUserSetting(paths);

            let includedInPatch = false;
            if (!Utils.isUndefined(currentValue)) {
                if (formValue !== currentValue) {
                    includedInPatch = true;
                }
            } else {
                if (!Utils.isUndefined(formValue)) {
                    includedInPatch = true;
                }
            }

            if (includedInPatch) {
                this.setValue(patch, paths, formValue);
            }
        });

        return patch;
    }

    /**
     * Ensures that the form value is of the same type as the user setting before saving it.
     *
     * @param entryInfo The entry information.
     * @param value The form value.
     * @returns The conformed value for the user setting.
     */
    private ensureType(entryInfo: JsonInfo.Entry, value: any): any {
        const inputType = entryInfo.type as JsonInfo.InputType;
        const valueType = entryInfo.valueType as JsonInfo.ValueType;

        switch (valueType as JsonInfo.ValueType) {
            case JsonInfo.ValueType.Bool:
                // For the case of boolean, we ignore the input type because we only support having a JSON boolean
                return !!value;
            case JsonInfo.ValueType.Date:
                return this.cast<Date>(inputType, value, Utils.asDate);
            case JsonInfo.ValueType.Int:
            case JsonInfo.ValueType.Number:
                return this.cast<number>(inputType, value, Utils.asNumber);
            case JsonInfo.ValueType.String:
            default:
                return this.cast<string>(inputType, value, Utils.asString);
        }
    }


    /**
     * Casts the value of a given type to another type.
     * <p>
     * If the given value is of array type, it is casted into another array containing element of the
     * desired type.
     *
     * @template T The desired type after casting.
     * @param inputType The type of form input where the value comes.
     * @param value The value to cast.
     * @param castFn The casting function.
     * @returns the cast result.
     */
    private cast<T>(
        inputType: JsonInfo.InputType, value: any, castFn: (params: any) => T | undefined
    ): T | T[] | undefined {
        if (Utils.isArray(value)) {
            const array = value as any[];
            const empty = array.length === 0;
            switch (inputType) {
                case JsonInfo.InputType.Entry:
                    return !empty ? castFn(array[0]) : undefined;
                case JsonInfo.InputType.MultiEntry:
                case JsonInfo.InputType.Range:
                    const result: T[] = [];
                    for (const v of array) {
                        result.push(castFn(v) as T);
                    }
                    return result;
            }
            return undefined;
        }

        return castFn(value);
    }

    /**
     * Reads the form value for the given entry.
     *
     * @param key The entry key.
     * @returns The form value.
     */
    private readFormValue(key: string): any {
        const formValue = this.form.value[key];
        if (Utils.isArray(formValue)) {
            switch (this.layout[key].type as JsonInfo.InputType) {
                case JsonInfo.InputType.Entry:
                    // The entry is single-value type whereas its corresponding form control has an array value.
                    // This should be because its form control is represented by a Select component.
                    // The array value should be then a singleton array, we simply return the first element.
                    const array = <any[]>formValue;
                    if (array.length !== 1) {
                        console.log('editUserSettings.readFormValue not a singleton array.');
                    }
                    return array[0];
                case JsonInfo.InputType.MultiEntry:
                    break;
                case JsonInfo.InputType.Range:
                    break;
            }
        }
        return formValue;
    }

    /**
     * Sets a JSON value.
     *
     * @param json The JSON to set.
     * @param paths The path of the value in the JSON.
     * @param value The value to set.
     */
    private setValue(json: MapOf<any>, paths: string[], value: any): void {
        const nbPaths = paths.length;
        if (nbPaths > 1) {
            for (let i = 0; i < nbPaths - 1; ++i) {
                const path = paths[i];
                if (!json[path]) {
                    json[path] = {};
                }
                json = json[path];
            }
        }

        json[paths[nbPaths - 1]] = Utils.isEmpty(value) ? null : value;
    }

    /**
     * Indicates the height of the dialog content to trigger scroll behavior when there are too many input controls.
     *
     * @return the height of the dialog content to trigger scroll behavior when there are too many input controls.
     */
    public get maxHeight(): string {
        //If size is undefined use 5 as default
        return (((this.visibleThreshold | 0) || 5) * 10) + "ex";
    }
}
