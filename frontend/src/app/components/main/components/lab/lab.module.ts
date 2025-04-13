import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LabComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    SharedModule
  ]
})
export class LabModule { }
