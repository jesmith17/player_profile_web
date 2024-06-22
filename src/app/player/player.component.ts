import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { SocialMedia } from '../models/social-media'
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit{




data: Observable<Profile> | undefined


constructor(private service: AppService, private route: ActivatedRoute){
  
}

ngOnInit(): void {
  this.route.paramMap.subscribe( paramMap => {
    var id = paramMap.get('id')!;
    this.data = this.service.getProfile(id);
})


  
}




}
