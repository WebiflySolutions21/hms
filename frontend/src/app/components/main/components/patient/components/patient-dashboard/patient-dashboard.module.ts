import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { SharedModule } from "../../../../../../shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PatientDashboardComponent
  ],
  imports: [
    CommonModule,
    PatientDashboardRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule
]
})
export class PatientDashboardModule { }
