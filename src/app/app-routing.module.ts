import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PlayerComponent } from './player/player.component';
import { LandingComponent } from './landing/landing.component';
import { PlayerSearchComponent } from './player-search/player-search.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, children: [
    {path: 'search', component: PlayerSearchComponent, pathMatch: 'full'},
    {path: ':id', component: PlayerComponent, pathMatch: 'full'}
    
  ]},
  {path: '**', component: LandingComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
