import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpthalPrintRoutingModule } from './opthal-print-routing.module';
import { OpthalPrintComponent } from './opthal-print.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OpthalPrintComponent
  ],
  imports: [
    CommonModule,
    OpthalPrintRoutingModule,
    SharedModule
  ]
})
export class OpthalPrintModule { }
