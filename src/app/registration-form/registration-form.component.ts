import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsService } from '../user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  constructor(private fb: FormBuilder, private formService: FormsService){};

  emailRegEx = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/

  signUpForm = this.fb.group({
    fName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    lName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ['', Validators.required],
    passCon: ['', Validators.required]
  });

  onSignup(){
    this.formService.onAddUser(<UserModel>this.signUpForm.value).subscribe({
      next: (res) => {
        alert('user created.');
      },
      error: (err) => {
        alert('Sign up error!')
      }
    });


    alert('registration Successful');
    console.log(`First Name: ${this.signUpForm.controls.fName.value}`);
    console.log(`Last Name: ${this.signUpForm.controls.lName.value}`);
    console.log(`Email: ${this.signUpForm.controls.email.value}`);
    console.log(`Password: ${this.signUpForm.controls.password.value}`);
    console.log(`Password Confirmation: ${this.signUpForm.controls.passCon.value}`);
  }

  EmailVal(){
    return this.signUpForm.controls['email'].invalid && this.signUpForm.controls['email'].hasError('required') && (this.signUpForm.controls['email'].dirty || this.signUpForm.controls['email'].touched) ? "Email is required" : 
    this.signUpForm.controls['email'].hasError('pattern') ? 'Invalid Email Address' : '' 
  }

  fNameVal(){
    return this.signUpForm.controls['fName'].invalid && this.signUpForm.controls['fName'].hasError('required') && (this.signUpForm.controls['fName'].dirty || this.signUpForm.controls['fName'].touched) ? "First Name is required" : 
    this.signUpForm.controls['fName'].hasError('minLength') ? 'Name must be 6 - 50 characters long' : '' 
    
  }
  lNameVal(){
    return this.signUpForm.controls['lName'].invalid && this.signUpForm.controls['lName'].hasError('required') && (this.signUpForm.controls['lName'].dirty || this.signUpForm.controls['lName'].touched) ? "Last Name is required" : ""
    
  }

}
