import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CustomValidators } from '../../core/validators/custom.validators';

describe('CustomValidators', () => {
  describe('courseDurationValidator', () => {
    const min = 1;
    const max = 600;
    const validatorFn = CustomValidators.courseDurationValidator(min, max);
        let control: AbstractControl;

    beforeEach(() => {
        control = new FormControl();
      });

    it('should return null if value is within range', () => {
      const control = new FormControl(50);
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return null if value is equal to minimum', () => {
      const control = new FormControl(min);
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return null if value is equal to maximum', () => {
      const control = new FormControl(max);
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return an error if value is less than minimum', () => {
      const control = new FormControl(min - 1);
      const result = validatorFn(control);
      expect(result).toEqual({ courseDurationValidator: true });
    });

    it('should return an error if value is greater than maximum', () => {
      const control = new FormControl(max + 1);
      const result = validatorFn(control);
      expect(result).toEqual({ courseDurationValidator: true });
    });

   
  });

  describe('courseDateValidator', () => {
    const validatorFn = CustomValidators.courseDateValidator;

    it('should return null if value is empty', () => {
      const control = new FormControl('');
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return null if value is valid date', () => {
      const control = new FormControl('05/12/21');
      const result = validatorFn(control);
      expect(result).toBeNull();
    });

    it('should return an error if value is invalid date format', () => {
      const control = new FormControl('05-12-21');
      const result = validatorFn(control);
      expect(result).toEqual({ courseDateValidator: true });
    });
  });
});
