import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { ForgotPassword, ResetPasswordDto, ResetPasswordRequest } from 'src/app/shared/models/ForgotPassword';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: false
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  constructor(private authService: AuthService, private passConfValidator: PasswordConfirmationValidatorService,
    private cookie: CookieService, private router:Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });
    this.resetPasswordForm.get('confirmPassword')?.setValidators([Validators.required,
    this.passConfValidator.validateConfirmPassword(this.getPasswordControl)]);  
  }
  public resetPassword = (resetPasswordFormValue:ResetPasswordRequest): void => {
    const result:ForgotPassword = JSON.parse(this.cookie.get('resetToken'));
    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirmPassword,
      token: result.token,
      email: result.email
    }

    this.authService.resetPassword(resetPassDto)
      .subscribe({
        next: () => {
          this.router.navigate(['/account/login'])
        }
      })
  }
  get getPasswordControl(): AbstractControl | any{
    return this.resetPasswordForm.get('password');
}
}
