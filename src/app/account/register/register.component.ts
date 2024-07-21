import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';



@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    errorMessage: string = '';
    showError!: boolean;
  
    constructor(private authService: AuthService, 
      private passConfValidator: PasswordConfirmationValidatorService, private router: Router) { }
  
    ngOnInit(): void {
      this.registerForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
        isRegularUser:new FormControl(true),
        role:new FormControl('Writer'),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('')
      });
      this.registerForm.get('confirmPassword')?.setValidators([Validators.required, 
      this.passConfValidator.validateConfirmPassword(this.registerForm.get('password') as any)]);
    }
  
    public validateControl = (controlName: string) => {
      return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
    }
  
    public hasError = (controlName: string, errorName: string) => {
      return this.registerForm.get(controlName)?.hasError(errorName)
    }
  
    public registerUser = (registerFormValue:UserForRegistrationDto) => {
      this.showError = false;
       this.authService.registerUser(registerFormValue)
      .subscribe({
        next: () => this.router.navigate(["/account/login"]),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
    }
}