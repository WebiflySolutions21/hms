import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateDashboardRoutingModule } from './template-dashboard-routing.module';
import { TemplateDashboardComponent } from './template-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateDashboardComponent,
  ],
  imports: [
    CommonModule,
    TemplateDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class TemplateDashboardModule { }
