import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage?: string;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  login(): void {
    this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage= 'Login Failed. Please check your email and password and try again'
      }
    })
  }

}
