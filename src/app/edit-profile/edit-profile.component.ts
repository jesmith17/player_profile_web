import {Component, OnInit, signal, TemplateRef, WritableSignal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs/internal/Observable';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Team} from "../models/team";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.sass'
})
export class EditProfileComponent implements OnInit {

  data: Observable<Profile> | undefined
  id?: string;
  profileForm: FormGroup;
  academicsForm: FormGroup;
  athleticsForm: FormGroup;
  mediaForm: FormGroup;
  searchForm: FormGroup;

  teamSearchTerm?: string;
  closeResult: WritableSignal<string> = signal('');
  teams?: Observable<Team[]>;

  constructor(private route: ActivatedRoute, private service: AppService, private fb: FormBuilder, private modalService: NgbModal ) {

    this.profileForm = this.fb.group({
      _id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: ['', Validators.required],
      email: ['',Validators.email],
      phone: ['', Validators.required],
      height: [''],
      weight: [''],
      picUrl: ['', Validators.required],
      social_media: this.fb.array([])

    })

    this.academicsForm = this.fb.group({
      gpa: ['', [Validators.required, Validators.max(5.0)]],
      gradYear: ['', Validators.required],
      classRank: ['', [Validators.min(0)]],
      classSize: ['', Validators.min(0)],
      act: ['', Validators.max(36)],
      sat: ['', Validators.max(1600)],
      clubs:this.fb.array([]),
      awards:this.fb.array([])
    })

    this.athleticsForm = this.fb.group({
      experience: [''],
      position: this.fb.array([]),
      jersey: [''],
      recruitment: [''],
      committed_school: [''],
      awards: this.fb.array([]),
      teams: this.fb.array([])
    });

    this.mediaForm = this.fb.group({
      highlights: this.fb.array([])
    });

    this.searchForm = this.fb.group({
      teamName: this.fb.array([])
    });



  }


  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id')!;
      if (this.id){  // Only patch the forms if it's an edit and not new
        this.data = this.service.getProfile(this.id);
        this.data.subscribe((data: Profile) => {
          this.id = data._id;
          for (var media of data.social_media) {
            this.addSocialMedia();
          }
          this.profileForm.patchValue(data);
          for (var award of data.academic.awards){
            this.addAcademicAward();
          }
          for (var club of data.academic.clubs){
            this.addAcademicClub();
          }
          this.academicsForm.patchValue(data.academic);
          for (var award of data.athletic.awards){
            this.addAthleticAward();
          }
          for (var team of data.athletic.teams){
            this.addTeamToForm();
          }
          for (var position of data.athletic.position){
            this.addPosition();
          }
          this.athleticsForm.patchValue(data.athletic);
          for (var highlight of data.highlights){
            this.addHighlight();
          }
          this.mediaForm.patchValue(data);
        })
      }
  })

  }


  addAcademicAward() {
    const awards = this.academicsForm.controls["awards"] as FormArray;
    awards.push(new FormControl())
  }

  addPosition() {
    const position = this.athleticsForm.controls["position"] as FormArray;
    position.push(new FormControl())
  }

  addAcademicClub() {
    const club = this.academicsForm.controls["clubs"] as FormArray;
    club.push(new FormControl())
  }

  addAthleticAward() {
    const awards = this.athleticsForm.controls["awards"] as FormArray;
    awards.push(new FormControl())
  }

  addHighlight() {
    const highlight = this.mediaForm.controls["highlights"] as FormArray;
    highlight.insert(0, this.fb.group({
      type:['', Validators.required],
      url: ['', Validators.required],
      description: ['', Validators.required]
    }))
  }

  addTeam(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', animation: true }).result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          //this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        },
      );
  }

  searchTeams() {
    if (this.teamSearchTerm) {
      this.teams = this.service.teamSearch(this.teamSearchTerm);
    }
  }

  selectTeam(team:Team) {
    const teams = this.athleticsForm.controls["teams"] as FormArray;
    teams.push(this.fb.group({
      team_id: [team._id],
      team_name:[team.team_name, Validators.required],
      coach: [team.coach, Validators.required],
      coach_email: [team.coach_email, Validators.required],
      jersey: ['', Validators.required],
    }))
    this.modalService.dismissAll();
  }


  addTeamToForm() {
    const team = this.athleticsForm.controls["teams"] as FormArray;
    team.push(this.fb.group({
      team_id: [''],
      team_name:['', Validators.required],
      coach: ['', Validators.required],
      coach_email: ['', Validators.required],
      jersey: ['', Validators.required],
    }))
  }


  addSocialMedia() {
    const social_media = this.profileForm.controls["social_media"] as FormArray
    social_media.push(this.fb.group({
      type:['', Validators.required],
      acct_id: ['', Validators.required]
    }))
  }

  removeEntry(index:number, controlName:string){
    var control;
    switch (controlName){
      case 'academic.awards':
        control = this.academicsForm.controls['awards'] as FormArray;
        control.removeAt(index);
        break;
      case 'clubs':
        control = this.academicsForm.controls['clubs'] as FormArray;
        control.removeAt(index);
        break;
      case 'athletic.awards':
        control = this.athleticsForm.controls['awards'] as FormArray;
        control.removeAt(index);
        break;
      case 'social_media':
        control = this.profileForm.controls['social_media'] as FormArray;
        control.removeAt(index);
        break;
      case 'teams':
        control = this.athleticsForm.controls['teams'] as FormArray;
        control.removeAt(index);
        break;
      case 'highlights':
        control = this.mediaForm.controls['highlights'] as FormArray;
        control.removeAt(index);
        break;
      case 'positions':
        control = this.athleticsForm.controls['position'] as FormArray;
        control.removeAt(index);
        break;
    }
  }


  getSocialMedia() {
    return (this.profileForm.get('social_media') as FormArray).controls;
  }

  getAcademicAwards() {
    return (this.academicsForm.get('awards') as FormArray).controls;
  }

  getAcademicClubs() {
    return (this.academicsForm.get('clubs') as FormArray).controls;
  }

  getAthleticsAwards() {
    return (this.athleticsForm.get('awards') as FormArray).controls;
  }

  getHighlights() {
    return (this.mediaForm.get('highlights') as FormArray).controls;
  }

  getTeams() {
    return (this.athleticsForm.get('teams') as FormArray).controls;
  }

  getPositions() {
    return (this.athleticsForm.get('position') as FormArray).controls;
  }

  saveProfile(): any {
    this.service.savePlayer(this.profileForm.value, this.id).subscribe((profile:Profile) => {
      this.id = profile._id;
      console.log(`ID has been set to a value of ${this.id}`);
    })

  }

  saveAcademics(): any {
    if (this.id) {
      let updates = {academic: this.academicsForm.value}
      this.data = this.service.savePlayer(updates, this.id)
    } else  {
      console.log('ID is null or undefined, so the save fails');
    }
  }

  saveAthletics(): any {
    if (this.id) {
      let updates = {athletic: this.athleticsForm.value}
      this.data = this.service.savePlayer(updates, this.id)
    } else  {
      console.log('ID is null or undefined, so the save fails');
    }
  }


  saveMedia(): any {
    if (this.id) {
      this.data = this.service.savePlayer(this.mediaForm.value, this.id)
    } else  {
      console.log('ID is null or undefined, so the save fails');
    }
  }





}
