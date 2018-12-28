import { Action } from '@ngrx/store';
import { Employer } from '../../shared/models/employer';

export enum EmployerActionTypes {
  LoadProfile = '[Employer] Load Profile',
  LoadProfile_Success = '[Employer] Load Profile SUCCESS',
  CreateEmployer = '[Employer] Create Employer',
  CreateEmployer_Success = '[Employer] Create Employer SUCCESS',
  UpdateEmployer = '[Employer] Update Employer',
  UpdateEmployer_Success = '[Employer] Update Employer SUCCESS'
}

export class LoadProfile implements Action {
  readonly type = EmployerActionTypes.LoadProfile;
  constructor() {}

}

export class LoadProfileSuccess implements Action {
  readonly type = EmployerActionTypes.LoadProfile_Success;
  constructor(public payload: Employer) {}
}

export class CreateEmployer implements Action {
  readonly type = EmployerActionTypes.CreateEmployer;
  constructor(public payload: Employer) {}
}

export class CreateEmployerSuccess implements Action {
  readonly type = EmployerActionTypes.CreateEmployer_Success;
  constructor(public payload: Employer) {}
}

export class UpdateEmployer implements Action {
  readonly type = EmployerActionTypes.UpdateEmployer;
  constructor(public payload: Employer) {}
}

export class UpdateEmployerSuccess implements Action {
  readonly type = EmployerActionTypes.UpdateEmployer_Success;
  constructor(public payload: Employer) {}
}

export type EmployerActions = 
      LoadProfile | 
      LoadProfileSuccess | 
      CreateEmployer |
      CreateEmployerSuccess |
      UpdateEmployer |
      UpdateEmployerSuccess;
