import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorConfigDashboardComponent } from './doctor-config-dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:DoctorConfigDashboardComponent
  },
  {
    path: 'doctor-config',
    loadChildren: () => import('./components/doctor-config/doctor-config.module').then(m => m.DoctorConfigModule),
  },
  {
    path: 'template-dashboard',
    loadChildren: () => import('./components/template-dashboard/template-dashboard.module').then(m => m.TemplateDashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorConfigDashboardRoutingModule { }
