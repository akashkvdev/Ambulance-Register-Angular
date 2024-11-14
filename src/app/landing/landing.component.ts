import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  user_name: any | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user_name = localStorage.getItem('user_name');
    console.log(this.user_name);
  }

  goBack() {
    // Navigate to the previous page
    window.history.back();
  }

  goForward() {
    // Navigate to the next page
    window.history.forward();
  }

  logout() {
    const confirmation = confirm('Are you sure you want to log out?'); // Show confirmation prompt
    if (confirmation) {
      sessionStorage.clear(); // Clear session storage
      localStorage.clear(); // Clear local storage
      this.router.navigate(['/login']); // Redirect to the login page
    }
  }
}
