import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorConfigDashboardRoutingModule } from './doctor-config-dashboard-routing.module';
import { DoctorConfigDashboardComponent } from './doctor-config-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorConfigDashboardComponent
  ],
  imports: [
    CommonModule,
    DoctorConfigDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DoctorConfigDashboardModule { }
