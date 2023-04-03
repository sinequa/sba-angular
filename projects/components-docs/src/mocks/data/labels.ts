import { Labels, LabelsRights } from "@sinequa/core/web-services";

export const LABELS: Labels = {
    labels: [
        "string",
        "test",
        "abcd"
    ]
}

export const LABELSRIGHTS: LabelsRights = {
    canManagePublicLabels: true,
    canEditPublicLabels: true
}

export const LABELS_MODAL_MODEL = {
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
};