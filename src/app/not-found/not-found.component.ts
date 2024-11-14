import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div *ngIf="isLoggedIn; else notLoggedIn">
        <a routerLink="/landing/user/menu">Go to Dashboard</a> <!-- Redirect to the landing page for logged-in users -->
      </div>
      <ng-template #notLoggedIn>
        <a routerLink="/login">Go to Login</a> <!-- Redirect to the login page for non-logged-in users -->
      </ng-template>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      margin-top: 50px;
    }
    a {
      text-decoration: none;
      color: blue;
      font-weight: bold;
    }
  `]
})
export class NotFoundComponent {
  // Check if the user is logged in
  isLoggedIn = !!localStorage.getItem('userInfo');
  
  constructor(private router: Router) {}
}
