import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpthalViewRoutingModule } from './opthal-view-routing.module';
import { OpthalViewComponent } from './opthal-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OpthalViewComponent
  ],
  imports: [
    CommonModule,
    OpthalViewRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class OpthalViewModule { }
