import { Component } from '@angular/core';
import { AppState } from './reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public loading: boolean;
  constructor(private store: Store<AppState>) {
    this.store.select('app').subscribe(state => {
      this.loading = state.loading;
    });
  }
  title = 'Epicycle';
}
