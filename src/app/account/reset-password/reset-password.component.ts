import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponse, ForgotPassword, NgxToastrService, PasswordConfirmationValidatorService, ResetPasswordDto, ResetPasswordRequest } from 'src/app/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: false
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  constructor(private authService: AuthService, private passConfValidator: PasswordConfirmationValidatorService,
    private cookie: CookieService, private router:Router, private ngxToastrService: NgxToastrService) { }

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
        next: (res:ApiResponse<string>) => {
          this.ngxToastrService.show(res?.message,'toast-success',"Success");
          this.router.navigate(['/account/login']);
        }
      })
  }
  get getPasswordControl(): AbstractControl | any{
    return this.resetPasswordForm.get('password');
}
}
