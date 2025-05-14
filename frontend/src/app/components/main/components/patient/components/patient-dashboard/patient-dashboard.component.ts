import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATIENT_TABLE_COLUMNS, PATIENT_TABLE_DATA } from '@assets/constants/patient.constants';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
tableCategories = Object.keys(PATIENT_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = PATIENT_TABLE_DATA;
  tableColumns = PATIENT_TABLE_COLUMNS;
  globalSearchTerm = ''; // Global search input
  filteredTableData: any = {};
  hospitalName = 'Apollo Hospital';
  hospitalAddress = '123, Main Street, City, State, Zip';
  hospitalContact = '123-456-7890';
  patientName = 'John Doe';
  age: number = 30;
  gender = 'Male'
  doctorName = 'Dr. Smith';
  doctorType = 'Cardiology';
  appointmentDate = '2023-10-01';
  appointmentTime = '10:00 AM';

  constructor(private router: Router) {
    this.filteredTableData = { ...this.tableData };
  }

  // Filter data based on global search term
  clearSearch() {
    this.globalSearchTerm = '';
    this.filterData();
  }


  

  filterData() {
    const searchTerm = this.globalSearchTerm.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredTableData = { ...this.tableData };
      return;
    }

    this.filteredTableData = {};

    for (const category of this.tableCategories) {
      this.filteredTableData[category] = this.tableData[category].filter(
        (item: any) => {
          const patientName = item.patientName?.toString().toLowerCase() || '';
          const contactNo = item.contactNo?.toString().toLowerCase() || '';

          return (
            patientName.includes(searchTerm) || contactNo.includes(searchTerm)
          );
        }
      );
    }

    console.log('Filtered Data:', this.filteredTableData);
  }

  handleAction(event: { action: string; row: any }) {
    console.log(event);
    if (event.action === 'view') {
      this.router.navigate(['/main/doctor/doctor-dashboard/prescription-view']);
    } else if (event.action === 'opd') {
      this.router.navigate(['/main/reception/reception-dashboard']);
    }
    console.log(`${event.action} clicked for`, event.row);
  }
}
