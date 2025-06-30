import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  user: User | null =  null;

  constructor(private authService: AuthService){
    this.authService.currentUser$.subscribe(user => this.user = user);


  }

}
