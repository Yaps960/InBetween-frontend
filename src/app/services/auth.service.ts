
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authKey = 'inbetween_signed_in';

  constructor(private router: Router) {}

  get isSignedIn(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }

  signIn(): void {
    localStorage.setItem(this.authKey, 'true');
  }

  signOut(): void {
    localStorage.removeItem(this.authKey);
    this.router.navigate(['/']);
  }
}
