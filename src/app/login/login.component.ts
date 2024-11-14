import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private allService: MyserviceService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  // Initialize the login form
  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      login_id: ['', Validators.required],
      contact_no: ['', Validators.required],
    });
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const toggleIcon: HTMLElement = document.getElementById('togglePassword') as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('bi-eye-slash');
      toggleIcon.classList.add('bi-eye');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('bi-eye');
      toggleIcon.classList.add('bi-eye-slash');
    }
  }



  // Handle form submission
  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      // Call the login service
      this.allService.logIn(loginData).subscribe({
        next: (response:any) => {
          console.log(response);
          
          if (response.success) {
          localStorage.setItem('authToken', response?.token);
          localStorage.setItem('user_id', response?.user?.user_id.toString());
          localStorage.setItem('user_name', response?.user?.user_name.toString());
          localStorage.setItem('organization_id',response?.user?.organization_id.toString());
          localStorage.setItem('navigations',response?.assigned_navigations.toString());

          localStorage.setItem('userInfo', JSON.stringify({
            navigations: response.assigned_navigations,         
          }))
            // alert('Login successful!');
            this.router.navigate(['/landing/user/menu']);
          } else {
            alert('Login failed. Please check your login ID and password.');
          }
        },
        error: (error:any) => {
          console.error('Login error:', error);
          alert('An error occurred. Please Check Your Id and Password again.');
        }
      });
    }
  }
}
