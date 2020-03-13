import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { EpicyclesComponent } from './epicycles/epicycles.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { CanvasComponent } from './canvas/canvas.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ContourComponent } from './debug/contour/contour.component';
import { ContourCanvasComponent } from './debug/contour-canvas/contour-canvas.component';

@NgModule({
  declarations: [AppComponent, FilePickerComponent, EpicyclesComponent, CanvasComponent, LoadingSpinnerComponent, ContourComponent, ContourCanvasComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
