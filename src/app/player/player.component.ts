import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute, Router}from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit{


url: string;

data: Observable<Profile> | undefined
user?: Observable<User>


constructor(private service: AppService, private route: ActivatedRoute, private authService: AuthService){
  this.url = window.location.href;
  this.user = this.authService.user;
}

ngOnInit(): void {
  this.route.paramMap.subscribe( paramMap => {
    var id = paramMap.get('id')!;
    this.data = this.service.getProfile(id);
})


  
}




}
