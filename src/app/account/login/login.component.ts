import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ILoggedInUser } from 'src/app/features/auth/models/login-response.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false,
  
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authService: AuthService,
    private cookieService: CookieService, private fb:FormBuilder,
    private router: Router) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
        password: ['', Validators.required]
    });    
}
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
        return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
    .subscribe({
      next: (response:ILoggedInUser) => {
        this.loading = false;
        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.data.token}`,
        undefined, '/', undefined, true, 'Strict');

        // Set User
        this.authService.setUser({
          email: response.data.email,
          roles: response.data.roles
        });

        // Redirect back to Home
        this.router.navigateByUrl('/');

      },
      error:()=>{
        this.loading = false;        
      },
      complete:()=>{
        this.loading = false;
      }
    });
  }

   // convenience getter for easy access to form fields
   get getControls():any { return this.loginForm.controls; }
}
