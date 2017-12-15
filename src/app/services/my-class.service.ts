import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IMyClass } from '../interfaces/myClass/my-class.interface';

import { WEB_API_URL } from '../config/web-api-address';

@Injectable()
export class MyClassService {

  constructor(
    private http: Http
  ) { }

  private myClassUrl: string = `${WEB_API_URL}/api/myClass/`;

  GetMyClassPerProgramWithFilter (programId: number, filterName: string, filterValue: string): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/filteredByProgramId/${programId}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetMyClassWithFilter (filterName: string, filterValue: string): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetMyClassAll (): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/all`, options)
    .map(response => response.json())
  }

  CreateMyClass (programId: number, myClass: IMyClass): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.myClassUrl}/${programId}`, myClass, options)
    .map(response => response.json())
  }

  UpdateMyClass (id: number, myClass: IMyClass): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.myClassUrl}/${id}`, myClass, options)
    .map(response => response.json())
  }

  DeleteMyClass (id: number): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'})
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.myClassUrl}/${id}`, options)
    .map(response => response.json())
  }

}
