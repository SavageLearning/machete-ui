import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as employerActions from '../actions/employer.actions';
import { switchMap, map } from 'rxjs/operators';
import { Employer } from '../../shared/models/employer';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployerEffects {
  uri: string = environment.dataUrl + '/api/employer/profile';
  constructor(
    private actions$: Actions, 
    private http: HttpClient
    ) {}

  @Effect()
  getEmployer$: Observable<Action> = this.actions$.pipe(
    ofType(employerActions.EmployerActionTypes.LoadProfile),
    switchMap(() => {
      return this.http.get(this.uri).pipe(map(data => data['data'] as Employer));
    }),
    map((employer) => new employerActions.LoadProfileSuccess(employer))
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(employerActions.EmployerActionTypes.UpdateEmployer),
    map((action: employerActions.UpdateEmployer) => action.payload),
    switchMap((employer: Employer) => {
      return this.http.put(this.uri, JSON.stringify(employer), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .pipe(map(data => { return data['data'] }));
    }),
    map((employer) => new employerActions.UpdateEmployerSuccess(employer))
  );
}
