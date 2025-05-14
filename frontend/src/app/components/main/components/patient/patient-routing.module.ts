import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path:'',
    component:PatientComponent,
    children:[
      {
        path:'patient-dashboard',
        loadChildren: () => import('./components/patient-dashboard/patient-dashboard.module').then(m => m.PatientDashboardModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
