import { Component, OnInit } from '@angular/core';
import { Point } from 'src/app/point.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducer';

@Component({
  selector: 'app-contour',
  templateUrl: './contour.component.html',
  styleUrls: ['./contour.component.css'],
})
export class ContourComponent implements OnInit {
  public points: Point[] = [];

  constructor(private store: Store<AppState>) {
    this.store.select('app').subscribe(state => {
      this.points = state.points;
    });
  }

  ngOnInit() {}

  get shouldDraw(): boolean {
    return this.points.length !== 0;
  }
}
