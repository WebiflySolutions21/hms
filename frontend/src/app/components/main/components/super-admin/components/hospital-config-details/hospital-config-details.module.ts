import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalConfigDetailsRoutingModule } from './hospital-config-details-routing.module';
import { HospitalConfigDetailsComponent } from './hospital-config-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HospitalConfigDetailsComponent
  ],
  imports: [
    CommonModule,
    HospitalConfigDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HospitalConfigDetailsModule { }
