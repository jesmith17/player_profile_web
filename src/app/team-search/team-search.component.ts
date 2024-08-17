import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrl: './team-search.component.sass'
})
export class TeamSearchComponent implements OnInit{

  searchForm: FormGroup;

  data!: Observable<Team[]>;

  constructor(private service: AppService, private fb: FormBuilder,private router: Router){
    this.searchForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    this.data = this.service.allTeams();
  }


  searchTeams(form:FormGroup) {
    this.data = this.service.teamSearch(form.value.name);
  }

  viewTeam(id: string){
    this.router.navigate(['/team', id]);
  }


}
