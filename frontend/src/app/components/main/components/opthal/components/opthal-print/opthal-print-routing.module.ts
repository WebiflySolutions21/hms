import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpthalPrintComponent } from './opthal-print.component';

const routes: Routes = [
  {
    path:'',
    component:OpthalPrintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpthalPrintRoutingModule { }
