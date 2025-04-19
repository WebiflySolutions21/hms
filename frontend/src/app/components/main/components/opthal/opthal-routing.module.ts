import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpthalComponent } from './opthal.component';

const routes: Routes = [
  {
    path: '',
    component: OpthalComponent,
    children: [
      {
        path: 'opthal-dashboard',
        loadChildren: () =>
          import('./components/opthal-dashboard/opthal-dashboard.module').then(
            (m) => m.OpthalDashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpthalRoutingModule {}
