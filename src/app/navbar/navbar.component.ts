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

  user?: Observable<User>;

  constructor(private authService: AuthService){
    //this.user = this.authService.user;
  }

}
