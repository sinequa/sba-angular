import { Component } from '@angular/core';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { LABELS_MODAL_MODEL } from 'src/mocks/data/labels';

@Component({
    selector: 'doc-edit-label',
    templateUrl: './edit-label.component.html',
    providers: [{
            provide: MODAL_MODEL, useValue: {
                valuesToBeAdded: [],
                valuesToBeRemoved: [],
                properties: LABELS_MODAL_MODEL
            }
        }],
    standalone: false
})
export class DocEditLabelComponent {

  code = `<sq-edit-label></sq-edit-label>`;
  code2 = `providers: [{
    provide: MODAL_MODEL, useValue: {
        valuesToBeAdded: [],
        valuesToBeRemoved: [],
        properties: {
            public: true,
            allowEditPublicLabels: true,
            allowManagePublicLabels: true,
            allowNewLabels: true,
            disableAutocomplete: false,
            action: 5,
            radioButtons: [
                {
                    id: "publicLabel",
                    name: "msg#labels.public",
                    value: true,
                    disabled: false,
                    checked: true,
                },
                {
                    id: "privateLabel",
                    name: "msg#labels.private",
                    value: false,
                    disabled: false,
                    checked: false,
                }
            ]
        }
    }
}]`;

}
