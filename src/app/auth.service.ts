import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import {Role, User} from './models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  private userSubject = new BehaviorSubject<User | null>(null);

  public currentUser$:Observable<User | null> = this.userSubject.asObservable();

  private token?: string |  null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
    if (this.hasValidToken()){
      this.getUser();
    }

    this.currentUser$.subscribe(currentUser => {
      console.log(`The currentUser object got updated and is now ${this.currentUser$}`)
    })
  }

  login(username: string, password: string): Observable<boolean> {
    const expandedHeaders = this.prepareHeader();
    return this.http.post(environment.apiUrl + '/users/login', {email: username, password: password}, expandedHeaders)
      .pipe(
        map((resp: any) => {
          const headers = resp.headers.get('Authorization').split(' ');
          const token = headers[headers.length - 1 ];
          if (token != null) {
            this.token = token;
            localStorage.setItem('currentUser', token);
            this.userSubject.next(resp.body);
            return true;
          } else {
            return false;
          }
        })
      );
  }

 getUser(): void {
      this.http.get<User>(environment.apiUrl + `/users/sessions`).subscribe((user: User) => {
        this.userSubject.next(user)
      })
 }

 canEditPlayer(user:User, playerId:string){
   if (!user) return false
   if (user.role == Role.ADMIN) {
     return true;
   } else return user.editableIds.includes(playerId);

 }

  logout() {
    this.http.delete(environment.apiUrl + '/users/logout').subscribe((r:any) => {
      this.token = null;
      this.userSubject.next(null);
      localStorage.removeItem('currentUser');
    });
  }

  createUser(user:any) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  public hasValidToken(): boolean {

    if (!this.token) {
      return false
    } else {
      return !this.jwtHelper.isTokenExpired(this.token);
    }

  }


  private prepareHeader(): object {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    return {
      headers: headers,
      observe: 'response'
    };
  }


}
