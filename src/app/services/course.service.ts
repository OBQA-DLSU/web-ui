import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICourse } from '../interfaces/course/course.interface';
import { WEB_API_URL } from '../config/web-api-address';
import "rxjs/add/operator/map";

@Injectable()
export class CourseService {

  constructor(private http:Http) { }
  
  private headers = new Headers();
  private courseUrl: string = `${WEB_API_URL}/api/course/`;

  GetCourse (programId: number): Observable<ICourse[]> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.get(this.courseUrl+`${programId}`,options)
    .map(response => response.json())
    .map(courses => {
      let newCourses: ICourse[] = [];
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

  CreateCourse (programId:number, course: ICourse): Observable<ICourse> {
    const { toBeAssessed } = course;
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.post(this.courseUrl+`${programId}/${toBeAssessed}`, course, options)
    .map(response => response.json())
  }

  UpdateCourse (id: number, course: ICourse): Observable<ICourse> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.put(this.courseUrl+`programCourse/${id}`, course, options)
    .map(response => response.json())
  }

  DeleteCourse (id: number): Observable<ICourse> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.delete(`${this.courseUrl}/programCourse/${id}`, options)
    .map(response => response.json())
  }

}
