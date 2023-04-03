import { ModalButton, ModalResult } from "@sinequa/core/modal";

export const button1: ModalButton = {
    result: ModalResult.Yes,
    primary: true,
    text: 'Yes',
    visible: true,
    validation: null as any,
    anchor: false,
    action: () => { },
    getText: () => { return 'Yes'; },
    click: () => { }
};

export const button2 = {
    result: ModalResult.No,
    primary: false,
    text: 'No',
    visible: true,
    validation: null as any,
    anchor: false,
    action: () => { },
    getText: () => { return 'No'; },
    click: () => { }
};

export const buttons = [button1, button2];