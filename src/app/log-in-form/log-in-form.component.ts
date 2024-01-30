import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.css'
})
export class LogInFormComponent {

  emailRegEx = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){};

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ['', Validators.required]
  });

  onLogin(){

    // this.authService.onUserAuth(<any>this.loginForm.value).subscribe()

    this.authService.onUserAuth(this.loginForm.value).subscribe({
      next: (res) => {
        // alert('Welcome Admin');
        alert("Welcome back " + this.loginForm.controls['email'].value);
        console.log(`res: ${res}`);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        alert(`Error Logging in`);
      }
    });
  };

  EmailVal(){
    return this.loginForm.controls['email'].invalid && this.loginForm.controls['email'].hasError('required') && (this.loginForm.controls['email'].dirty || this.loginForm.controls['email'].touched) ? "Email is required" : 
    this.loginForm.controls['email'].hasError('pattern') ? 'Invalid Email Address' : '' 
  }

}
