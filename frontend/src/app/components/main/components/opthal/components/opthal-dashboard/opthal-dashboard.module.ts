import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpthalDashboardRoutingModule } from './opthal-dashboard-routing.module';
import { OpthalDashboardComponent } from './opthal-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OpthalDashboardComponent
  ],
  imports: [
    CommonModule,
    OpthalDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class OpthalDashboardModule { }
