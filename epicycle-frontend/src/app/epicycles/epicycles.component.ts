import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Epicycle } from '../epicycle.model';
import { Store } from '@ngrx/store';
import { AppState } from '../reducer';

@Component({
  selector: 'app-epicycles',
  templateUrl: './epicycles.component.html',
  styleUrls: ['./epicycles.component.css'],
})
export class EpicyclesComponent implements OnInit {
  public epicycles: Epicycle[] = [];

  public scale: number;

  public angularVelocity: number;

  constructor(private store: Store<AppState>) {
    this.store.select('app').subscribe(state => {
      this.epicycles = [];
      for (const epicycleData of state.epicycles) {
        this.epicycles.push(new Epicycle(epicycleData.radius, epicycleData.phase, epicycleData.angularVelocity));
      }
    });
  }

  ngOnInit() {
    this.scale = 50;
    this.angularVelocity = 0.001;
  }

  onZoom(zoomFactor: number) {
    this.scale += zoomFactor;
  }

  onSpeedup(speedUpFactor: number) {
    this.angularVelocity += speedUpFactor;
  }

  get shouldDraw(): boolean {
    return this.epicycles.length !== 0;
  }
}
