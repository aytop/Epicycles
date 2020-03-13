import { Action } from '@ngrx/store';
import { Point } from '../point.model';

export const UPLOAD_IMG = '[App] UPLOAD_IMG';
export const GET_CONTOUR = '[App] GET_CONTOUR';
export const SUCCESS_RESPONSE = '[App] RECIEVE_EPICYCLES';
export const ERROR_RESPONSE = '[App] ERROR_RESPONSE';
export const CONTOUR_SUCCESS = '[App] CONTOUR_SUCCESS';
export const CONTOUR_ERROR = '[App] CONTOUR_ERROR';

export class GetContour implements Action {
  readonly type = GET_CONTOUR;
  constructor(public payload: { formData: FormData }) {}
}

export class ContourSuccess implements Action {
  readonly type = CONTOUR_SUCCESS;
  constructor(public payload: { points: Point[] }) {}
}

export class ContourError implements Action {
  readonly type = CONTOUR_ERROR;
}

export class UploadImage implements Action {
  readonly type = UPLOAD_IMG;
  constructor(public payload: { formData: FormData; order: number }) {}
}

export class SuccessResponse implements Action {
  readonly type = SUCCESS_RESPONSE;
  constructor(public payload: { epicycles: any[] }) {}
}

export class ErrorResponse implements Action {
  readonly type = ERROR_RESPONSE;
}

export type AppAction = UploadImage | SuccessResponse | ErrorResponse | ContourSuccess | ContourError | GetContour;
