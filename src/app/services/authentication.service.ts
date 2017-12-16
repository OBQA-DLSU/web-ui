import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUserCreate } from '../interfaces/user/user-create.interface';
import { ISessionCreate } from '../interfaces/session/session-create.interface';
import { ISession } from '../interfaces/session/session.interface';

import { WEB_API_URL } from '../config/web-api-address';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }
  
  private signUpUrl: string = `${WEB_API_URL}/api/auth/signup`;
  private signInUrl: string = `${WEB_API_URL}/api/auth/signin`;

  SignUp(userCreate: IUserCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.signUpUrl, userCreate, options)
    .map(response => response.json())
  }

  SignIn(sessionCreate:ISessionCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.signInUrl, sessionCreate, options)
    .map(response => response.json())
  }

  SessionSave(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  SessionRead(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }

  SessionDestroy(): void {
    localStorage.clear();
  }

}
