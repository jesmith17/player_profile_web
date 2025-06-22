import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Team } from '../models/team';
import {AnalyticsService} from "../analytics.service";

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrl: './team-search.component.sass'
})
export class TeamSearchComponent implements OnInit{

  searchForm: FormGroup;

  data!: Observable<Team[]>;

  constructor(private service: AppService, private fb: FormBuilder,private router: Router, private analyticsService: AnalyticsService){
    this.searchForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    this.data = this.service.allTeams();
  }


  searchTeams(form:FormGroup) {
    this.data = this.service.teamSearch(form.value.name);
    this.analyticsService.trackEvent('Team Searhced', form.value.name, "TEAM_SEARCH" )
  }

  viewTeam(id: string){
    this.router.navigate(['/team', id]);
  }


}
