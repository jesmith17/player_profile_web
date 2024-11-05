import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './models/profile';
import { environment } from 'src/environments/environment';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProfile(id: string): Observable<Profile>{
    return this.http.get<Profile>(`./assets/data/${id}.json`)
  }

  public getPlayers(team_id: string): Observable<Profile[]> {
    let teamFilter = new HttpParams().set('team', team_id);
    return this.http.get<Profile[]>('./assets/data/player_profile.players.json')
  }

  public playerSearch(criteria: string): Observable<Profile[]>{
    let searchParams = new HttpParams().set('criteria', criteria);
    return this.http.get<Profile[]>('./assets/data/player_profile.players.json')
  }

  public teamSearch(criteria: string): Observable<Team[]>{
    let searchParams = new HttpParams().set('criteria', criteria);
    return this.http.get<Team[]>(`${this.apiUrl}/teams/search`,{params: searchParams})
  }

  public allTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(`./assets/data/player_profile.teams.json`)
  }

  public getTeam(id: string): Observable<Team>{
    return this.http.get<Team>(`./assets/data/${id}.json`)
  }

  public savePlayer(data:any, id?: string): Observable<Profile> {

    let player = {player: data}
    if (id){
      return this.http.put<Profile>(`${this.apiUrl}/players/${id}`,{player: data})
    } else {
      return this.http.post<Profile>(`${this.apiUrl}/players`,{player: data})
    }
  }


}
