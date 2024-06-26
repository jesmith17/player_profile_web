import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();
  user?: Observable<User>;
   
  private token?: string |  null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('currentUser');
    if (this.hasValidToken() && this.token != null){
      // Retrieve user and load. 
      this.getUser(this.jwtHelper.decodeToken(this.token)['jti']);
    } else {
      console.log('User is empty, hope they didnt need a protected page')
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const expandedHeaders = this.prepareHeader();
    return this.http.post(environment.apiUrl + '/login', {user: {email: username, password: password}}, expandedHeaders)
      .pipe(
        map((resp: any) => {
          const headers = resp.headers.get('Authorization').split(' ');
          const token = headers[headers.length - 1 ];
          if (token != null) {
            this.token = token;
            localStorage.setItem('currentUser', token);
            this.user = new Observable(resp.body);
            return true;
          } else {
            return false;
          }
        })
      );
  }

 getUser(jti: string): void {
   this.user = this.http.get<User>(environment.apiUrl + `/users/registrations/${jti}`);
 }




  logout() {
    this.token = null;
    console.log("Logout got called");
    localStorage.removeItem('currentUser');
  }

  public hasValidToken(): boolean {
    return this.token != null && !this.jwtHelper.isTokenExpired(this.token);
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
