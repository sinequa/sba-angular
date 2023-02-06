import {Component} from '@angular/core';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html'
})
export class InputsComponent {

    /**
     * Text input variables
     */
    disabledInput: boolean = false;
    validInput: boolean = false;
    invalidInput: boolean = false;
    codeInput: string = `<label for="my-input" class="form-label">Some label <span class="info">(Optional)</span></label>
<input type="text" class="form-control" placeholder="Placeholder..." id="my-input"/>
<div class="invalid-feedback">
    Error description...
</div>`;

    /**
     * Icon input variables
     */
    disabledInputIcon: boolean = false;
    validInputIcon: boolean = false;
    invalidInputIcon: boolean = false;
    codeInputIcon: string = `<div class="input-group input-icon">
    <!-- Left icon -->
    <div class="input-group-prepend">
        <span class="input-group-text">
            <i class="fas fa-calendar"></i>
        </span>
    </div>
    <!-- Input -->
    <input type="text" class="form-control" placeholder="Type something...">
    <!-- Also works with select:
     <select class="form-control" placeholder="Choose something...">
        <option></option>
    </select>
    -->
    <!-- Right icon -->
    <div class="input-group-append">
        <span class="input-group-text">
            <i class="fas fa-times-circle"></i>
        </span>
    </div>
</div>`;

    /**
     * Textarea variables
     */
    disabledTA: boolean = false;
    validTA: boolean = false;
    invalidTA: boolean = false;
    codeTA: string = `<textarea class="form-control" placeholder="Placeholder..."></textarea>`;


    /**
     * Checkbox / radio button variables
     */
    disabledCB: boolean = false;
    validCB: boolean = false;
    invalidCB: boolean = false;
    radio: number;
    codeCB: string = `<div class="form-check">
    <input type="checkbox" class="form-check-input" id="my-checkbox"/>
    <label for="my-checkbox">Some label</label>
</div>

<div class="form-check">
    <input type="radio" class="form-check-input" id="my-radio"/>
    <label for="my-radio">Some label</label>
</div>`;

/**
 * Badges
 */
 codeBadge: string = `<span class="badge rounded-pill bg-primary me-2">
    Badge
    <span class="fas fa-times-circle ms-1"></span>
</span>`;


    constructor() {
    }

}
