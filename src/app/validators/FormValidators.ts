import {FormControl, ValidationErrors} from '@angular/forms';

export class FormValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if ((control.value != null) && (control.value.trim().length == 0)) {
      return {notOnlyWhiteSpace: true};
    }
    return null;
  }

  static forbiddenNames(text: string[]): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const forbidden: boolean = text.some((p: string) => {
        const regExp = new RegExp(p, 'i');
        return regExp.test(control.value);
      });
      return forbidden ? {forbiddenNames: {value: control.value}} : null;
    }
  }

}
