import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpthalDashboardRoutingModule } from './opthal-dashboard-routing.module';
import { OpthalDashboardComponent } from './opthal-dashboard.component';


@NgModule({
  declarations: [
    OpthalDashboardComponent
  ],
  imports: [
    CommonModule,
    OpthalDashboardRoutingModule
  ]
})
export class OpthalDashboardModule { }
