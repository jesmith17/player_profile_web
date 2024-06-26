import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './models/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getProfile(id: string): Observable<Profile>{
    return this.http.get<Profile>(`${this.apiUrl}/players/${id}`)
  }

  public playerSearch(criteria: string): Observable<Profile[]>{
    let searchParams = new HttpParams().set('criteria', criteria);
    return this.http.get<Profile[]>(`${this.apiUrl}/players/search`,{params: searchParams})
  }

  public savePlayer(data:any, id: string) {
    
    let player = {player: data}
    console.log(player);
    console.log(id);
    this.http.put<Profile>(`${this.apiUrl}/players/${id}`,{player: data}).subscribe(response => {
      console.log(response);
    })
  }


}
