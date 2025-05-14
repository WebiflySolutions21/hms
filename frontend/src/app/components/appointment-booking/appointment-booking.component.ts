// appointment-booking.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss']
})
export class AppointmentBookingComponent {
  appointmentForm: FormGroup;
  hospitals: any[] = []; // Populate from API
  filteredHospitals: any[] = [];
  doctors: any[] = []; // Populate from API
  filteredDoctors: any[] = [];
  availableSlots: any[] = [];
  showDoctorLeaveMessage = false;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      hospital: ['', Validators.required],
      doctor: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(500)]],
      patient: this.fb.group({
        name: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        address: ['', Validators.required],
        whatsapp: [''],
        district: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
        referredBy: ['']
      })
    });

    // Load initial data (replace with API calls)
    this.loadHospitals();
  }

  loadHospitals() {
    // API call to get hospitals
    // this.hospitalService.getHospitals().subscribe(data => {
    //   this.hospitals = data;
    //   this.filteredHospitals = data;
    // });
  }

  filterHospitals(searchTerm: string) {
    this.filteredHospitals = this.hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onHospitalSelect() {
    const hospitalId = this.appointmentForm.get('hospital')?.value?.id;
    if (hospitalId) {
      // API call to get doctors for selected hospital
      // this.doctorService.getDoctorsByHospital(hospitalId).subscribe(data => {
      //   this.doctors = data;
      //   this.filteredDoctors = data;
      // });
    }
  }

  filterDoctors(searchTerm: string) {
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onDoctorSelect() {
    const doctor = this.appointmentForm.get('doctor')?.value;
    if (doctor) {
      this.availableSlots = doctor.availableDates;
      this.showDoctorLeaveMessage = doctor.availableDates.some(d => d.isOnLeave);
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData: any = {
        ...this.appointmentForm.value,
        dateTime: {
          date: this.appointmentForm.get('appointmentDate')?.value,
          time: this.appointmentForm.get('appointmentTime')?.value
        }
      };
      // Submit to API
      console.log(appointmentData);
    }
  }
}