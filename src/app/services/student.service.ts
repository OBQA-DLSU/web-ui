import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IMyClassView } from '../interfaces/myClass/my-class-view.interface';

import { WEB_API_URL } from '../config/web-api-address';

@Injectable()
export class StudentService {

  constructor(
    private http: Http
  ) { }

  private studentUrl: string = `${WEB_API_URL}/api/student`;

  getMyClassStudent (id: number): Observable<IMyClassView> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/myClass/${id}`, options)
    .map(response => response.json())
  } 

}
