import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateDashboardComponent } from './template-dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:TemplateDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDashboardRoutingModule { }
