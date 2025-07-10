import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {User} from "../models/user";
import {CommonModule} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  registerForm: FormGroup;
  successMessage?: string;
  errorMessage?: string;

  constructor(private authService:AuthService, private fb:FormBuilder, private router:Router){
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['PARENT', Validators.required]
    })
  }


register(){
    this.authService.createUser(this.registerForm.value).subscribe({
      next: (user: User) => {
        this.successMessage = 'Your account has been successfully created'
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        if (err.error.includes('duplicate key error collection')){
          this.errorMessage = 'The email provided is already associated with an account. Please try a different email address, or try to login'
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.'
        }
      }
    })
}


}
