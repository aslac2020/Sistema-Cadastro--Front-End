import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from "./star.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    StarComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    ReactiveFormsModule,
    AlertComponent
  ],
  entryComponents:[ AlertComponent]

})
export class SharedModule { }
