import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorConfigRoutingModule } from './doctor-config-routing.module';
import { DoctorConfigComponent } from './doctor-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../../../../../shared/shared.module";


@NgModule({
  declarations: [
    DoctorConfigComponent
  ],
  imports: [
    CommonModule,
    DoctorConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class DoctorConfigModule { }
