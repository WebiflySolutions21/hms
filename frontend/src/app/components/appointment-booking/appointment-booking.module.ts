import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentBookingRoutingModule } from './appointment-booking-routing.module';
import { AppointmentBookingComponent } from './appointment-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppointmentBookingComponent
  ],
  imports: [
    CommonModule,
    AppointmentBookingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppointmentBookingModule { }
