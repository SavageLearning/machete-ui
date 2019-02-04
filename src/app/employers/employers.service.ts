
import {of as observableOf,  Observable ,  BehaviorSubject, Subject } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';
import { User } from '../shared/services/user-manager';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployersService {
  private employerSource: BehaviorSubject<Employer>;
  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor');
    this.employerSource = new BehaviorSubject<Employer>(null);
    this.fetchEmployer().subscribe();
   }

  fetchEmployer(): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';    
    return this.http.get(uri).pipe(
      map(data => {
        this.setEmployer(data['data'] as Employer);
        return data['data'] as Employer;
      }),
      catchError(error => {
        this.setEmployer(null);
        console.log('error from getEmployer');
        return observableOf(null);
      }),);
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
      }).pipe(map(
        data => {
          this.setEmployer(data['data'] as Employer);
          return data['data'];
        }));
  }
}
