import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  registerForm: FormGroup;

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
    this.authService.createUser(this.registerForm.value).subscribe((user:User) => {
      if (user){
        this.router.navigate(['login']);
      }
    })
}


}
