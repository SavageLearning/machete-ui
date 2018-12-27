import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EmployersService } from '../../employers/employers.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as employerActions from '../actions/employer.actions';
import { switchMap, map } from 'rxjs/operators';
import { LoadProfileSuccess } from '../actions/employer.actions';
import { Employer } from '../../shared/models/employer';

@Injectable()
export class EmployerEffects {

  constructor(
    private actions$: Actions, 
    private employerService: EmployersService
    ) {}

  @Effect()
  getEmployer$: Observable<Action> = this.actions$.pipe(
    ofType(employerActions.EmployerActionTypes.LoadProfile),
    switchMap(() => {
      return this.employerService.getEmployer()
        .pipe(
          map((employer) => {
            return new employerActions.LoadProfileSuccess(employer);
          })
        )
    })
  );
}
