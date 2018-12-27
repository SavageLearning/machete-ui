import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromEmployer from './employer.reducer';

export interface State {

  employer: fromEmployer.State;
}

export const reducers: ActionReducerMap<State> = {

  employer: fromEmployer.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// Employer Selectors
export const selectEmployerState = createFeatureSelector<fromEmployer.State>("employer");
export const getEmployer = createSelector(selectEmployerState, fromEmployer.getEmployer);
