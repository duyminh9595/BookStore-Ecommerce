import { FormControl, ValidationErrors } from "@angular/forms";

export class FormRegister {
    static notOnlyWhiteSpace(control:FormControl):ValidationErrors|null
    {
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'notOnlyWhitespace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}