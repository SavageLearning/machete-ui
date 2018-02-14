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
  private employerSource: BehaviorSubject<Employer>;
  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor');
    this.employerSource = new BehaviorSubject<Employer>(null);
    this.fetchEmployer();
   }

  fetchEmployer() {
    let uri = environment.dataUrl + '/api/employer/profile';    
    this.http.get(uri)
      .subscribe(
        data => {
          this.setEmployer(data['data'] as Employer);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.setEmployer(null);
          
          if (error.status != 404)
          {
            HandleError.error(error);
          }
        });
  }
  getEmployer(): Observable<Employer> {
    //console.log('get---');
    return this.employerSource.asObservable();
  }

  setEmployer(employer: Employer) {
    //console.log('set===', employer);
    this.employerSource.next(employer);
  }

  save(employer: Employer): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employer/profile';
    let method: Function;
    //uri = uri + '/' + employer.id;
    console.log('save:', uri, employer);
    // create or update 
    return this.http.put(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).map(
        data => {
          //console.log('employer from PUT:', data['data']);
          this.setEmployer(data['data'] as Employer);
          return Observable.of(data['data'] );
        })
        .catch(
          HandleError.error
      );
  }
}
