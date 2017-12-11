import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WEB_API_URL } from '../config/web-api-address';
import { ISopi } from '../interfaces/sopi/sopi.interface';

@Injectable()
export class SopiService {

  constructor(private http:Http) { }
  
  private headers = new Headers();
  private sopiUrl: string = `${WEB_API_URL}/api/sopi`;

  GetSopi (programId: number): Observable<ISopi[]> {
    this.headers.append('Content-type','application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.get(`${this.sopiUrl}/${programId}`, options)
    .map(response => response.json())
    .map(sopis => {
      let newSopis: ISopi[] = [];
      sopis.map(sopi => {
        const newSopi = {
          id: sopi.id,
          so: sopi.sopi.so.code,
          code: sopi.sopi.code,
          description: sopi.description,
          program: sopi.program
        };
        newSopis.push(newSopi);
      });
      return newSopis;
    })
  }

  CreateSopi (programId: number, sopi: ISopi): Observable<ISopi> {
    this.headers.append('Content-type', 'application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.post(`${this.sopiUrl}/${programId}`, sopi, options)
    .map(response => response.json())
  }

  UpdateSopi (id: number, sopi: ISopi): Observable<ISopi> {
    this.headers.append('Content-type', 'application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.put(`${this.sopiUrl}/programSopi/${id}`, sopi, options)
    .map(response => response.json())
  }

  DeleteSopi (id: number): Observable<ISopi> {
    this.headers.append('Content-type', 'application/json');
    const options = new RequestOptions({headers: this.headers});
    return this.http.delete(`${this.sopiUrl}/programSopi/${id}`, options)
    .map(response => response.json())
  }

}
