import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const passwordsMatch: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordsMismatch: true };
};

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-signup',
  styleUrl: './signup.scss',
  templateUrl: './signup.html',
})

export class Signup {
  submitted = false;

  signupForm;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.nonNullable.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatch },
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // Account creation is yet to be implemented.
    console.log('Sign-up form is valid');
  }
}
