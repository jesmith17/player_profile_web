import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit{


  constructor(private authService: AuthService, private router: Router){}


  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/']);


  }




}
