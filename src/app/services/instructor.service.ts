import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IInstructor } from '../interfaces/instructor/instructor.interface';
import { IInstructorView } from '../interfaces/instructor/instructor-view.interface';

import { WEB_API_URL } from '../config/web-api-address';


@Injectable()
export class InstructorService {

  constructor(
    private http: Http
  ) { }

  private instructorUrl: string = `${WEB_API_URL}/api/instructor/`;

  GetAllInstructor (): Observable<IInstructor[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.instructorUrl}all`, options)
    .map(response => response.json())
  }

  GetInstructor (programId: number): Observable<IInstructor[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.instructorUrl+`program/${programId}`,options)
    .map(response => response.json())
  }

  CreateInstructor (programId: number, instructor: IInstructorView): Observable<IInstructor> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.instructorUrl}program/${programId}`, instructor, options)
    .map(response => response.json())
  }

  GetOneInstructor (id: number): Observable<IInstructor> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.instructorUrl}${id}`, options)
    .map(response => response.json())
  }

  UpdateInstructor (id: number, instructor: IInstructorView): Observable<IInstructor> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.instructorUrl}${id}`, instructor, options)
    .map(response => response.json())
  }

  DeleteInstructor (id: number) : Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.instructorUrl}${id}`, options)
    .map(response => response.json())
  }

}
