import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUserInvite } from '../interfaces/user/user-invite.interface';
import { WEB_API_URL } from '../config/web-api-address';
import "rxjs/add/operator/map";

@Injectable()
export class InvitationService {

  constructor(private http:Http) { }
  private inviteUrl: string = `${WEB_API_URL}/api/invitation/`;

  Invite (userInvites: IUserInvite[]): Observable<any[]> {
    const headers = new Headers();
    headers.append('Content-type','application/json');
    const options = new RequestOptions({headers});
    return this.http.post(this.inviteUrl, userInvites, options)
    .map(response => response.json())
  }
}
