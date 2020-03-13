import * as fromApp from './store/app.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  app: fromApp.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  app: fromApp.appReducer,
};
