import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PlayerComponent } from './player/player.component';
import { LandingComponent } from './landing/landing.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { QrgeneratorComponent } from './qrgenerator/qrgenerator.component';
import { TeamSearchComponent } from './team-search/team-search.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, children: [
    {path: 'search', component: PlayerSearchComponent, pathMatch: 'full'},
    {path: 'new', component: EditProfileComponent, pathMatch: 'full'},
    {path: ':id', children: 
      [
        {path: '', component: PlayerComponent},
        {path: 'edit', component: EditProfileComponent, pathMatch: 'full', canActivate:[AuthGuard]}
      ]
    }
    
  ]},
  {path: 'team', children: [
    {path: 'search', component: TeamSearchComponent, pathMatch: 'full'},
    {path: ':id', children: 
      [
        {path: '', component: TeamDetailComponent},
      ]
    }
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: PlayerSearchComponent},
  {path: '**', component: PlayerSearchComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
