import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNotePage } from './add-note';
import { NgxErrorsModule } from '@ultimate/ngxerrors';


@NgModule({
  declarations: [
    AddNotePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotePage),
    NgxErrorsModule
  ],
})
export class AddNotePageModule {}
