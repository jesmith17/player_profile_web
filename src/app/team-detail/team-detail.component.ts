import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Team } from '../models/team';
import { Profile } from '../models/profile';
import {AnalyticsService} from "../analytics.service";
import {Roster} from "../models/roster";

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.sass'
})
export class TeamDetailComponent implements OnInit {

  team?:Observable<Team>;
  currentTeamId?:string;

  players?: Observable<Profile[]>;


  constructor(private service:AppService, private route:ActivatedRoute, private router: Router, private analyticsService: AnalyticsService){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      var id = paramMap.get('id')!;
      this.currentTeamId = id;
      this.team = this.service.getTeam(id);
      this.analyticsService.trackEvent('Team Loaded', id, "TEAM_PROFILE_LOAD" )
      this.players = this.service.getPlayers(id);
    })
  }

  getCurrentTeamRoster(profile: Profile): Roster | undefined {
    return profile.athletic.teams.find(roster => roster.team_id === this.currentTeamId);
  }

  viewProfile(id: string){
    this.router.navigate(['/profile', id]);
  }



}
