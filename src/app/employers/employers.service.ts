import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';
import {  User } from 'oidc-client';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class EmployersService {
  private employerSource: BehaviorSubject<Employer>;
  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor');
    this.employerSource = new BehaviorSubject<Employer>(null);
    this.fetchEmployer();
   }

  fetchEmployer(): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';    
    return this.http.get(uri)
      .map(data => {
        this.setEmployer(data['data'] as Employer);
        return data['data'] as Employer;
      })
      .catch(error => {
        this.setEmployer(null);
        return Observable.throw(error)
      });
  }
  getEmployer(): Observable<Employer> {
    return this.employerSource.asObservable();
  }

  setEmployer(employer: Employer) {
    this.employerSource.next(employer);
  }

  save(employer: Employer): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';
    let method: Function;
    console.log('save:', uri, employer);
    // create or update 
    return this.http.put(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).map(
        data => {
          this.setEmployer(data['data'] as Employer);
          return Observable.of(data['data'] );
        })
        .catch(
          HandleError.error
      );
  }
}
