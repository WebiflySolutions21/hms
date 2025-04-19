import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpthalRoutingModule } from './opthal-routing.module';
import { OpthalComponent } from './opthal.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OpthalComponent
  ],
  imports: [
    CommonModule,
    OpthalRoutingModule,
    SharedModule
  ]
})
export class OpthalModule { }
