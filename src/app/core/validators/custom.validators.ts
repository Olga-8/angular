import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static courseDurationValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.value !== undefined &&
        (Number.isNaN(control.value) ||
          control.value < min ||
          control.value > max)
      ) {
        return {
          courseDurationValidator: true,
        };
      }
      return null;
    };
  }

  static courseDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const date = control.value;
    const datePattern = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
    if (date !== undefined && date !== '' && datePattern.test(date) === false) {
      return {
        courseDateValidator: true,
      };
    }
    return null;
  }
}
