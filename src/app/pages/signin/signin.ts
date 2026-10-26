import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-signin',
  styleUrl: './signin.scss',
  templateUrl: './signin.html',
})

export class Signin {
  submitted = false;

  signinForm;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    // Authentication is yet to be implemented.
    console.log('Sign-in form is valid');
  }
}
