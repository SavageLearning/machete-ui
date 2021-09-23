import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsComponent } from './lookups.component';
import { LookupsRoutingModule } from './lookups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LookupsRoutingModule
  ],
  declarations: [LookupsComponent]
})
export class LookupsModule { }
