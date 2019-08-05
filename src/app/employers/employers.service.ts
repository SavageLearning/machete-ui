
import { Observable, BehaviorSubject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';

@Injectable()
export class EmployersService {
  private employerSource: BehaviorSubject<Employer>;
  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor: EmployersService');
    this.employerSource = new BehaviorSubject<Employer>(null);
    this.fetchEmployer().subscribe();
   }

  fetchEmployer(): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';    
    return this.http.get(uri, { withCredentials: true }).pipe(
      map(data => {
        this.setEmployer(data['data'] as Employer);
        return data['data'] as Employer;
      }),
      catchError(error => {
        this.setEmployer(null);
        console.log('error from getEmployer');
        return Observable.of(null);
      }),); // TODO is this last 'undefined' bit intentional?
  }
  getEmployer(): Observable<Employer> {
    return this.employerSource.asObservable();
  }

  setEmployer(employer: Employer) {
    this.employerSource.next(employer);
  }

  save(employer: Employer): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';

    console.log('save:', uri, employer);
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    // hack to get out the door; SavageLearning/Machete#425
    employer.referredBy = 25;

    // create or update
    return this.http.put(uri, JSON.stringify(employer), { headers: httpHeaders, withCredentials: true }).pipe(
      map(data => {
        this.setEmployer(data['data'] as Employer);
        return data['data'];
      })
    );
  }
}
