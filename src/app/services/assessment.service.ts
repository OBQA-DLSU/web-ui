import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAssessment } from '../interfaces/assessment/assessment.interface';
import { IAssessmentView } from '../interfaces/assessment/assessment-view.interface';
import { WEB_API_URL } from '../config/web-api-address';
import "rxjs/add/operator/map";

@Injectable()
export class AssessmentService {

  constructor(
    private http: Http
  ) { }

  private assessmentUrl: string = `${WEB_API_URL}/api/assessment`;

  GetAssessment (programId: number): Observable<IAssessment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentUrl}/programAssessment/${programId}`, options)
    .map(response => response.json())
  }

  CreateAssessment (programId: number, assessment: IAssessmentView): Observable<IAssessment> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.assessmentUrl}/programAssessment/${programId}`, assessment, options)
    .map(response => response.json())
  }

  GetFilteredAssessmentByProgram (programId: number, filterName: string, filterValue: string): Observable<IAssessment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentUrl}/filteredByProgram/${programId}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetAllAssessment (): Observable<IAssessment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentUrl}/all`, options)
    .map(response => response.json())
  }

  GetFilteredAssessment (filterName: string, filterValue: string): Observable<IAssessment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentUrl}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetOneAssessment (id: number): Observable<IAssessment> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentUrl}/${id}`, options)
    .map(response => response.json())
  }

  UpdateAssessment (id: number, assessment: IAssessmentView): Observable<IAssessment> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.assessmentUrl}/${id}`, assessment, options)
    .map(response => response.json())
  }

  DeleteAssessment (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.assessmentUrl}/${id}`, options)
    .map(response => response.json())
  }

}
