import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { State } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AppActions from '../store/app.actions';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css'],
})
export class FilePickerComponent implements OnInit {
  imageSource: string | ArrayBuffer = '';
  imageFile: File;
  showImage = false;
  public order = 100;
  constructor(private changeDetector: ChangeDetectorRef, private store: Store<State>) {}

  ngOnInit() {}
  onChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageFile = file as File;
      this.showImage = true;
      console.log(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSource = reader.result;

        // need to run CD since file load runs outside of zone
        this.changeDetector.markForCheck();
      };
    }
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
  get fileLabel() {
    if (this.imageFile) {
      return this.imageFile.name;
    } else {
      return 'File';
    }
  }

  onSubmit() {
    console.log(this.order);
    this.store.dispatch(
      new AppActions.UploadImage({
        formData: this.toFormData({ file: this.imageFile }),
        order: this.order,
      }),
    );
    // this.store.dispatch(
    //   new AppActions.GetContour({
    //     formData: this.toFormData({ file: this.imageFile }),
    //   }),
    // );
    this.showImage = false;
  }
}
