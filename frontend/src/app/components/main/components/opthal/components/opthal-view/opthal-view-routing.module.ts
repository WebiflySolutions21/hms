import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpthalViewComponent } from './opthal-view.component';

const routes: Routes = [
  {
    path:'',
    component:OpthalViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpthalViewRoutingModule { }
