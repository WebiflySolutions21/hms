import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATIENT_ROUTES } from '@assets/constants/patient.constants';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
 doctorRoutes = PATIENT_ROUTES
 hospitalName = "Hospital Name"
 loginDetails = {
  name : "Lokesh Thakare",
  imageUrl:"assets/images/header/doctor.jpeg",
  designation:"Doctor",
  contactNo:"1234567890",
  type:"Orthopedic",
 }

 constructor(private router:Router) {  }


  navigateUser(data) {
    
      this.router.navigate([`/main/patient/${data?.path}`])


    console.log(data);
  }



}
