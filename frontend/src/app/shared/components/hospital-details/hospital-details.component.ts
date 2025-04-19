import { Component } from '@angular/core';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.scss']
})
export class HospitalDetailsComponent {
hospitalDetails:any

ngOnInit(){
  this.hospitalDetails = JSON.parse(localStorage.getItem("hospitalFormData"))
}
}
