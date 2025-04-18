import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpthalDashboardComponent } from './opthal-dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:OpthalDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpthalDashboardRoutingModule { }
