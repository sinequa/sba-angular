import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from "@sinequa/core/app-utils";
import { Locale, IntlService } from "@sinequa/core/intl";
import { MapOf } from "@sinequa/core/base";

import { JsonInfo } from "../edit-user-settings/edit-user-settings";


/**
 * Editor for User settings.
 * <p>
 * This component can add form control for modifiable settings which are not shown by JsonEditor component.
 *
 */
@Component({
    selector: 'sq-user-settings-editor',
    templateUrl: './user-settings-editor.html'
})
export class BsUserSettingsEditor implements OnInit {

    @Input() public form: FormGroup;
    @Input() public model: MapOf<any>;
    @Input() public layout: MapOf<JsonInfo.Entry>;
    @Input() showUILanguageSelector: boolean;
    public locales: Locale[];

    constructor(
        private appService: AppService,
        private intlService: IntlService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        if (!this.appService.app) {
            return; // logout
        }

        // Locale is treated separately because it is not really stored in the user settings.
        this.locales = [];
        if (this.intlService.locales.length > 0) {
            for (const locale of this.intlService.locales) {
                this.locales.push(locale);
            }
        }

        this.model['language'] = this.intlService.currentLocale.name;
        this.form.addControl('selectedLocale', this.formBuilder.control(this.intlService.currentLocale.name));
/*
        if (this.config && this.config.items) {
            this.config.items.forEach(item => {
                if (item.active && JsonEditor.isInputComponent(item)) {
                    const entry = <JsonInfo.Entry>item;
                    const paths = Utils.split(entry.path, '.');
                    const pathLength = paths.length;
                    const currentValue = this.userSettingsService.readUserSetting(paths)
                    const entryKey = paths[pathLength - 1];

                    // Add model value
                    this.setModelValue(paths, currentValue);

                    // Add layout
                    this.layout[entryKey] = entry;

                    // Add form control
                    this.form.addControl(
                        entryKey,
                        this.formBuilder.control(currentValue, Validators.compose(JsonEditor.makeValidatorFunctions(entry, this.validationService))));
                }
            });
        }
        */
    }

    /**
     * Sets the current value of an entry to our JSON model.
     *
     * @param paths The paths to the entry in the JSON model.
     * @param value The value to set.
     */
    /*private setModelValue(paths: string[], value: any): void {
        const nbPaths = paths.length;
        let json = this.model;
        if (nbPaths > 1) {
            for (let i = 0; i < nbPaths - 1; ++i) {
                const path = paths[i];
                if (!json[path]) {
                    json[path] = {};
                }
                json = json[path];
            }
        }

        const key = paths[nbPaths - 1];
        json[key] = value;
    }*/

    /**
     * Indicates if the UI language selector is shown in the User settings editor dialog.
     * By default, returns true.
     *
     * @returns true if the UI language selector is shown in the User settings editor dialog.
     */
    public showLanguageSelector(): boolean {
        return this.showUILanguageSelector;
    }
}
