import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalConfigDetailsComponent } from './hospital-config-details.component';

const routes: Routes = [
  {
    path:'',
    component:HospitalConfigDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalConfigDetailsRoutingModule { }
