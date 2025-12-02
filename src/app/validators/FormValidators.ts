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

  // diferencia con Validators.min() que permite valores decimales .min() solo enteros
  static minValue(value: number): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      if (control.value < value) return {minValue: true};
      else return null;
    }
  }

  // al declararlo FormValidators.allowedExtension(new RegExp( /.jpg$|.jpeg$|.png$/i))
  static allowedExtension(regex: RegExp): ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const allowed: boolean = regex.test(control.value);
      return allowed ? null : {allowedExtension: true};
    }
  }

}
