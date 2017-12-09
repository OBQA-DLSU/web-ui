import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ISession } from '../interfaces/session/session.interface';
import { ICourse } from '../interfaces/course/course.interface';

import { WEB_API_URL } from '../config/web-api-address';

@Injectable()
export class CourseService {

  constructor(private http:Http) { }
  
  private headers = new Headers();
  private courseUrl: string = `${WEB_API_URL}/api/course/`;

  GetCourse (programId: number): Observable<ICourse[]> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.get(this.courseUrl+`${programId}`,options)
    .lift(response => response.json())
  }

  CreateCourse (programId:number, course: ICourse): Observable<ICourse> {
    const { toBeAssessed } = course;
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.post(this.courseUrl+`${programId}/${toBeAssessed}`, course, options)
    .lift(response => response.json())
  }

  UpdateCourse (id: number, course: ICourse): Observable<ICourse> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.put(this.courseUrl+`programCourse/${id}`, course, options)
    .lift(response => response.json())
  }

}
