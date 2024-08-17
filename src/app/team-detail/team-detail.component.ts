import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Team } from '../models/team';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.sass'
})
export class TeamDetailComponent implements OnInit {
  
  url: string;
  team?:Observable<Team>;

  players?: Observable<Profile[]>;
  
  
  constructor(private service:AppService, private route:ActivatedRoute, private router: Router){
    this.url = window.location.href;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      var id = paramMap.get('id')!;
      this.team = this.service.getTeam(id);
      this.players = this.service.getPlayers(id);
    })
  }

  viewProfile(id: string){
    this.router.navigate(['/profile', id]);
  }



}
