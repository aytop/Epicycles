import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as AppActions from './app.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Epicycle } from '../epicycle.model';
import { of } from 'rxjs';
import { Point } from '../point.model';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadEpicycles = this.actions$.pipe(
    ofType(AppActions.UPLOAD_IMG),
    switchMap((action: AppActions.UploadImage) => {
      return this.http
        .post<Epicycle[]>('http://localhost:8080/epicycles', action.payload.formData, {
          params: new HttpParams().set('order', '' + action.payload.order),
        })
        .pipe(
          map(epicycles => {
            return new AppActions.SuccessResponse({ epicycles: epicycles.slice(0, 1000) });
          }),
          catchError(() => {
            return of(new AppActions.ErrorResponse());
          }),
        );
    }),
  );

  @Effect()
  loadContour = this.actions$.pipe(
    ofType(AppActions.GET_CONTOUR),
    switchMap((action: AppActions.GetContour) => {
      return this.http.post<Point[]>('http://localhost:8080/contour', action.payload.formData).pipe(
        map(points => {
          return new AppActions.ContourSuccess({ points });
        }),
        catchError(() => {
          return of(new AppActions.ContourError());
        }),
      );
    }),
  );
}
