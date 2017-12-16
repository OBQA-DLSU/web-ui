import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICourse } from '../interfaces/course/course.interface';
import { IProgramCourse } from '../interfaces/programCourse/program-course.interface';
import { WEB_API_URL } from '../config/web-api-address';
import "rxjs/add/operator/map";

@Injectable()
export class CourseService {

  constructor(private http:Http) { }
  
  private courseUrl: string = `${WEB_API_URL}/api/course/`;

  GetCourse (programId: number): Observable<IProgramCourse[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.courseUrl+`${programId}`,options)
    .map(response => response.json())
    .map(courses => {
      let newCourses: IProgramCourse[] = [];
      courses.map(course => {
        const newCourse = {
          id: course.id,
          name: course.course.name,
          code: course.course.code,
          description: course.description,
          toBeAssessed: course.toBeAssessed
        }
        newCourses.push(newCourse);
      });
      return newCourses;
    })
  }

  CreateCourse (programId:number, course: ICourse, toBeAssessed: boolean): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.courseUrl+`${programId}/${toBeAssessed}`, course, options)
    .map(response => response.json())
  }

  UpdateCourse (id: number, course: ICourse): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.courseUrl+`programCourse/${id}`, course, options)
    .map(response => response.json())
  }

  DeleteCourse (id: number): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.courseUrl}/programCourse/${id}`, options)
    .map(response => response.json())
  }

}
