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

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, children: [
    {path: 'search', component: PlayerSearchComponent, pathMatch: 'full'},
    {path: ':id', children: 
      [
        {path: '', component: PlayerComponent},
        {path: 'edit', component: EditProfileComponent, pathMatch: 'full', canActivate:[AuthGuard]}
      ]
    }
    
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: PlayerSearchComponent},
  {path: '**', component: LandingComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
