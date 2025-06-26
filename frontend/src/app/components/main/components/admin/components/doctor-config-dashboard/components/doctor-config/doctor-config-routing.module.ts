import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorConfigComponent } from './doctor-config.component';

const routes: Routes = [

  {
    path:"",
    component:DoctorConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorConfigRoutingModule { }
