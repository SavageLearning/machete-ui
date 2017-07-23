import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import { HandleError } from "../shared/handle-error";
import { Employer } from "../shared/models/employer";
import { AuthService } from "../shared/index";
import { Log } from "oidc-client";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class EmployersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getEmployerBySubject(): Observable<Employer> {
    let uri = environment.dataUrl + '/api/employers';
    
    // TODO handle null sub in employerService.getOrders
    uri = uri + '?sub=' + this.auth.currentUser.profile['sub'];
    return this.http.get(uri)
      .map(o => o['data'] as Employer)
      .catch(HandleError.error);
  }

  save(employer: Employer): Observable<Object> {
    let uri = environment.dataUrl + '/api/employers';
    uri = uri + '/' + employer.id;
    Log.info('employers.service.save: called');
    return this.http.put(uri, JSON.stringify(employer), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
      //.catch(HandleError.error);
  }
}
