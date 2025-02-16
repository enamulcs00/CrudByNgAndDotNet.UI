
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControlDirective, FormGroup, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'lib-input',
  templateUrl: './lib-input.component.html',
  styleUrls: ['./lib-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders:[
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibInputComponent),
      multi: true
    }
  ]
})
export class LibInputComponent implements OnInit  , ControlValueAccessor  {
@Input() appearance : MatFormFieldAppearance = 'outline';
@Input({required:true}) label! : string;
@Input() placeholder : string = 'Please give your input';
@Input() fieldType : string = 'text';
@Input ({required:true}) submitted : boolean = false;
@Input ({required:true}) formField!:AbstractControl;
@Input({required:true}) formControlName:string = 'input_control';
@Input() errorMessage:string = "This field is required.";

typeChange:string = 'text'
hide = signal(true);
  constructor() {}

  ngOnInit() {}
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  };
  get isFormInvalid():boolean {
    return !!(
      (this.formField.touched || this.formField?.dirty) && this.formField.errors
    )
  }
  writeValue(value: string): void {
  }
  registerOnChange(fn: any): void {    
  }
  registerOnTouched(fn: any): void {    
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  getErrorMessage(control: AbstractControl): string {
    if (!control || !control.errors) {
      return '';
    }
    let text = '';
    for (const errorKey in control.errors) {
      if (control.hasError(errorKey)) {
        switch (errorKey) {
          case 'required': text = `${this.label} is required!`; break;
          case 'pattern': text = `${this.label} has wrong pattern!`; break;
          case 'email': text = `${this.label} has wrong email format!`; break;
          case 'minlength': text = `Minimum length should be ${control.getError('minlength')?.requiredLength}!`; break;
          case 'maxlength': text = `Maximum length should be ${control.getError('maxlength')?.requiredLength}!`; break;
          case 'min': text = `Value should be at least ${control.getError('min')?.min}!`; break;
          case 'max': text = `Value should not exceed ${control.getError('max')?.max}!`; break;
          case 'passwordMismatch': text = `Passwords do not match!`; break;
          default: text = `${this.label} is invalid!`;
        }
        return text;
      }
    }
    return text;
  }
}
