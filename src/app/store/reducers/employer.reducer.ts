import { Action } from '@ngrx/store';
import * as actions from '../actions/employer.actions';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import { Employer } from '../../shared/models/employer';
//
// Cribbed EntityAdapter use from github.com:avatsaev/angular-contacts-app-example
// export const employerAdapter = createEntityAdapter<Employer>({
//   selectId: (employer: Employer) => employer.id,
//   sortComparer: false
// })

export interface State  {
  employer?: Employer;
}

export const initialState: State = {
  employer: null
};

export const getEmployer = (state: State) => state.employer;

export function reducer(
  state: State = initialState, 
  action: actions.EmployerActions): State {

  switch (action.type) {
    // 
    case actions.EmployerActionTypes.CreateEmployer_Success: 
      return {
        ...state,
        employer: action.payload
      };
    //
    case actions.EmployerActionTypes.LoadProfile_Success:
      return {
        ...state,
        employer: action.payload
      };
        //
    case actions.EmployerActionTypes.UpdateEmployer_Success:
      return {
        ...state,
        employer: action.payload
      };
    default:
      return state;
  }
}
