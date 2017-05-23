import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportsComponent } from './exports.component';
import {ExportsRoutingModule} from './exports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ExportsRoutingModule
  ],
  declarations: [ExportsComponent]
})
export class ExportsModule {
  constructor() {
    console.log('ExportsModule-ctor');
  }
}
