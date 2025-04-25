import { Component } from '@angular/core';
import { PATIENT_DETAILS } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-patient-details-view',
  templateUrl: './patient-details-view.component.html',
  styleUrls: ['./patient-details-view.component.scss']
})
export class PatientDetailsViewComponent {
  patientDetails = PATIENT_DETAILS
}
