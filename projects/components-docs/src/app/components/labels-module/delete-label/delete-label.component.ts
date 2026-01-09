import { Component } from '@angular/core';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { LABELS_MODAL_MODEL } from 'src/mocks/data/labels';

@Component({
    selector: 'doc-delete-label',
    templateUrl: './delete-label.component.html',
    providers: [{
            provide: MODAL_MODEL, useValue: {
                values: ["string", "test", "abcd"],
                properties: LABELS_MODAL_MODEL
            }
        }],
    standalone: false
})
export class DocDeleteLabelComponent {

  code = `<sq-delete-label></sq-delete-label>`;
  code2 = `providers: [{
    provide: MODAL_MODEL, useValue: {
        values: ["string", "test", "abcd"],
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
