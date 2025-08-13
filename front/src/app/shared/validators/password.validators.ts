// src/app/shared/validators/password.validators.ts
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

/**
 * Strong password:
 * - min 8 chars
 * - at least 1 digit
 * - at least 1 lowercase
 * - at least 1 uppercase
 * - at least 1 special char
 */
export const strongPassword = (): ValidatorFn => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    if (!value) return null;
    return regex.test(value) ? null : { weakPassword: true };
  };
};

export const matchPasswords = (passwordKey: string, confirmKey: string) => {
  return (group: AbstractControl): ValidationErrors | null => {
    const fg = group as FormGroup;
    const pass = fg.get(passwordKey)?.value;
    const confirm = fg.get(confirmKey)?.value;
    if (!pass || !confirm) return null;
    return pass === confirm ? null : { passwordsMismatch: true };
  };
};
