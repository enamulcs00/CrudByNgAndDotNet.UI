import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
        email: ['', Validators.required],
        password: ['', Validators.required]
    });    
}
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value)
    .subscribe({
      next: (response) => {
        this.loading = false;

        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect back to Home
        this.router.navigateByUrl('/');

      }
    });
  }

   // convenience getter for easy access to form fields
   get getControls():any {
    
    return this.loginForm.controls; }
}
