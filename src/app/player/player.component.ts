import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import {forkJoin, Observable} from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute, Router}from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import {AnalyticsService} from "../analytics.service";
import {Game} from "../models/game";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnInit{


url: string;

data: Observable<Profile> | undefined
user: Observable<User | null>
  games: Game[] = [];
canEditPlayer:boolean = false;


constructor(private service: AppService, private route: ActivatedRoute, public authService: AuthService, private analyticsService: AnalyticsService){
  this.url = window.location.href;
  this.user = this.authService.currentUser$;
}

ngOnInit(): void {
  this.route.paramMap.subscribe( paramMap => {
    var id = paramMap.get('id')!;
    this.data = this.service.getProfile(id);
    this.user.subscribe((user:User | null) => {
      this.canEditPlayer = this.authService.canEditPlayer(user!, id);
    })
    this.data.subscribe(data => {
      const teamRequests = data.athletic.teams.map(roster =>
        this.service.getTeam(roster.team_id)
      );

      forkJoin(teamRequests).subscribe(teams => {
        this.games = teams.flatMap(team => team.games);
        this.games = this.games.filter(game => game.game_time >= new Date());
        this.games.sort((a:Game, b:Game) => a.game_time.getTime() - b.game_time.getTime());

      });
    });

    this.analyticsService.trackEvent('Profile Loaded', id, "PROFILE_LOAD" )
})



}




}
