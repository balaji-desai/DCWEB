import { AbstractControl } from "@angular/forms";

export function ValidateUrl(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
      return { validUrl: true };
    }
    return null;
  }

  export function DropdownValidation(control: AbstractControl) {
    if (control.value == '' || control.value == '0' || control.value == 'select') {
      return { required: true };
    }
    return null;
  }