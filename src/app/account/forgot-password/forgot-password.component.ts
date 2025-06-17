import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPassword } from 'src/app/core/models/ForgotPassword';
import { emailRegex, ApiResponse } from 'src/app/core/models/general';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    standalone: false
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup
  successMessage!: string;
  errorMessage!: string;
  showSuccess!: boolean;
  showError!: boolean;
  loading = false;
  
  constructor(private _authService: AuthService, private router:Router, private cookieService: CookieService) { }
  
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required,Validators.pattern(emailRegex
      )])
    })
  }


  public forgotPassword = (forgotPasswordFormValue:ForgotPassword):void => {
  this.loading = true;

    if(this.forgotPasswordForm.invalid){
  this.loading = false;

      this.forgotPasswordForm.markAllAsTouched();
      this.forgotPasswordForm.updateValueAndValidity();
      return
    }
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };

    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/account/resetpassword',
      token:''
    }

    this._authService.forgotPassword(forgotPassDto)
    .subscribe({
      next: (res:ApiResponse<ForgotPassword>) => {
      this.cookieService.set('resetToken', JSON.stringify(res?.data) ,
        undefined, '/', undefined, true, 'Strict')
      this.showSuccess = true;
      this.loading = false;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
      this.router.navigate(['/account/resetpassword'])
    },
    error: (err: HttpErrorResponse) => {
  this.loading = false;

      this.showError = true;
      this.errorMessage = err.message;
    }})
  }
}
