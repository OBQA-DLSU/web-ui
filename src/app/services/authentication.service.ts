import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { IUserCreate } from '../interfaces/user/user-create.interface';
import { ISessionCreate } from '../interfaces/session/session-create.interface';
import { ISession } from '../interfaces/session/session.interface';
import { IProgram } from '../interfaces/program/program.interface';

import { WEB_API_URL } from '../config/web-api-address';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }
  
  private authUrl: string = `${WEB_API_URL}/api/auth/`;
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

  SessionUpdate(isStudent: boolean, isAdmin: boolean, programId: number): ISession {
    const previousSession: ISession = this.SessionRead();
    const index = _.findIndex(previousSession.user.instructors, (i) => { return i.programId == programId; });
    let newSession: ISession = {
      user: previousSession.user,
      isStudent,
      isAdmin,
      programId,
      program: previousSession.user.instructors[index].program,
      token: previousSession.token
    };
    this.SessionSave(newSession);
    return newSession;
  }

  ForgotPassword(email: string) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.authUrl}password`, { email }, options)
    .map(response => response.json())
  }

}
