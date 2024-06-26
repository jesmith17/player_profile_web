import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute, Router}from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit{


url: string;

data: Observable<Profile> | undefined


constructor(private service: AppService, private route: ActivatedRoute){
  this.url = window.location.href;
}

ngOnInit(): void {
  this.route.paramMap.subscribe( paramMap => {
    var id = paramMap.get('id')!;
    this.data = this.service.getProfile(id);
})


  
}




}
