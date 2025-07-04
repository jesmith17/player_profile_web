import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { Router } from '@angular/router';
import {AnalyticsService} from "../analytics.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.sass']
})
export class PlayerSearchComponent implements OnInit{

  searchForm: FormGroup;

  data!: Observable<Profile[]>;

  constructor(private service: AppService, private fb: FormBuilder,private router: Router, private analyticsService: AnalyticsService, public authService: AuthService){
    this.searchForm = this.fb.group({
      name: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    //this.data = this.service.playerSearch('test');
  }


  searchPlayers(form:FormGroup) {
    this.data = this.service.playerSearch(form.value.name);
    this.analyticsService.trackEvent('Player Search', form.value.name, "PLAYER_SEARCH" )
  }

  viewProfile(id: string){
    this.router.navigate(['/profile', id]);
  }


}
