import { Epicycle } from '../epicycle.model';
import * as AppAction from './app.actions';
import { Point } from '../point.model';

export interface State {
  epicycles: Epicycle[];
  loading: boolean;
  error: boolean;
  points: Point[];
}

const initState: State = {
  epicycles: [],
  loading: false,
  error: false,
  points: [],
};

export function appReducer(state: State = initState, action: AppAction.AppAction): State {
  switch (action.type) {
    case AppAction.GET_CONTOUR:
    case AppAction.UPLOAD_IMG:
      return {
        ...state,
        epicycles: [],
        points: [],
        loading: true,
      };
    case AppAction.SUCCESS_RESPONSE:
      return {
        ...state,
        epicycles: action.payload.epicycles,
        loading: false,
        error: false,
      };
    case AppAction.CONTOUR_ERROR:
    case AppAction.ERROR_RESPONSE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case AppAction.CONTOUR_SUCCESS:
      return {
        ...state,
        points: action.payload.points,
        loading: false,
        error: false,
      };
    default:
      return {
        ...state,
      };
  }
}
