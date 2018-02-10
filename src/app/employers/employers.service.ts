import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';
import { Log, User } from 'oidc-client';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployersService {

  constructor(private http: HttpClient, private auth: AuthService) {
    console.log('.ctor');
   }

  getEmployerBySubject(): Observable<Employer> {
    return this.auth.getUser$()
      // using mergeMap to pass the Observable up
      .mergeMap((user: User) => {
        let uri = environment.dataUrl + '/api/employer/profile';

        return this.http.get(uri)
        .map(o => {
          console.log(uri, o);
          if (o['data'] == null) {
            return new Employer();
          }
          return o['data'] as Employer;
        })
        .catch((error: HttpErrorResponse) =>
          {
           if (error.status == 404)
           {}
            //HandleError.error
            return HandleError.error(error);
          }
        );
      });
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
