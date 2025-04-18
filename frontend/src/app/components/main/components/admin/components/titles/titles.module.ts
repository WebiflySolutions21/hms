import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesComponent } from './titles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TitlesComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TitlesModule { }
