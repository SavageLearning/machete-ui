import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';
import { Log, User } from 'oidc-client';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class EmployersService {
  private employerSource: Subject<Employer>;
  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor');
    this.employerSource = new Subject<Employer>();
    this.fetchEmployer();
   }

  fetchEmployer() {
    let uri = environment.dataUrl + '/api/employer/profile';    
    this.http.get(uri)
      .subscribe(
        data => {
          this.setEmployer(data as Employer);
        },
        (error: HttpErrorResponse) => {
          this.setEmployer(null);
          
          if (error.status != 404)
          {
            HandleError.error(error);
          }
        });
  }
  getEmployer(): Observable<Employer> {
    return this.employerSource.asObservable();
  }

  setEmployer(employer: Employer) {
    this.employerSource.next(employer);
  }

  save(employer: Employer): Observable<Object> {
    let uri = environment.dataUrl + '/api/employer/profile';
    let method: Function;
    //uri = uri + '/' + employer.id;
    console.log('save:', uri, employer);
    // create or update 
    if (employer.id === null)
    return this.http.post(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .catch(HandleError.error);
    else
    return this.http.put(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .catch(HandleError.error);
  }
}
