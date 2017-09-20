import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HandleError } from '../shared/handle-error';
import { Employer } from '../shared/models/employer';
import { AuthService } from '../shared/index';
import { Log, User } from 'oidc-client';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getEmployerBySubject(): Observable<Employer> {
    return this.auth.getUser$()
      .mergeMap((user: User) => {
        let uri = environment.dataUrl + '/api/employers';
        uri = uri + '?sub=' + user.profile['sub'];
        return this.http.get(uri)
        .map(o => o['data'] as Employer)
        .catch(HandleError.error);    
      });
  }

  save(employer: Employer): Observable<Object> {
    let uri = environment.dataUrl + '/api/employers';
    uri = uri + '/' + employer.id;
    console.log('http.put:', uri, employer);
    return this.http.put(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .catch(HandleError.error);
  }
}
