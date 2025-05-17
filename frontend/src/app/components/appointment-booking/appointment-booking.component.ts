import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Hospital {
  id: number;
  name: string;
  address?: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospitalId: number;
}

interface DoctorAvailability {
  onLeave: boolean;
  dates: string[];
  time: string;
}

interface Appointment {
  date: string | null;
  time: string | null;
  reason: string | null;
}

interface Patient {
  name: string | null;
  mobile: string | null;
  contact: string | null;
  whatsapp: string | null;
  address: string | null;
  district: string | null;
  pincode: string | null;
  referredBy: string | null;
}

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss']
})
export class AppointmentBookingComponent implements OnInit {
  showErrors = false;
  currentStep = 1;

  // Form data
  selectedHospital: number | null = null;
  selectedDoctor: number | null = null;
  appointment: Appointment = {
    date: null,
    time: null,
    reason: null
  };
  patient: Patient = {
    name: null,
    mobile: null,
    contact: null,
    whatsapp: null,
    address: null,
    district: null,
    pincode: null,
    referredBy: null
  };

  // Sample data - replace with your actual data sources
  hospitalList: Hospital[] = [
    { id: 1, name: 'City General Hospital', address: '123 Main Street' },
    { id: 2, name: 'Metropolitan Medical Center', address: '456 Oak Avenue' },
    { id: 3, name: 'Sunshine Children Hospital', address: '789 Pine Road' }
  ];

  doctorList: Doctor[] = [
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', hospitalId: 1 },
    { id: 2, name: 'Dr. Johnson', specialization: 'Pediatrics', hospitalId: 1 },
    { id: 3, name: 'Dr. Williams', specialization: 'Neurology', hospitalId: 2 },
    { id: 4, name: 'Dr. Brown', specialization: 'Orthopedics', hospitalId: 3 }
  ];

  filteredDoctors: Doctor[] = [];
  doctorAvailability: DoctorAvailability | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize with empty doctor list
    this.filteredDoctors = [];
  }

  onHospitalChange(): void {
    this.selectedDoctor = null;
    this.doctorAvailability = null;
    
    if (this.selectedHospital) {
      this.filteredDoctors = this.doctorList.filter(
        doctor => doctor.hospitalId === this.selectedHospital
      );
    } else {
      this.filteredDoctors = [];
    }
    
    this.moveToStep(2);
  }

  onDoctorChange(): void {
    this.doctorAvailability = null;
    
    if (this.selectedDoctor) {
      // Simulate API call to get availability
      setTimeout(() => {
        const isOnLeave = Math.random() > 0.8; // 20% chance doctor is on leave
        
        if (isOnLeave) {
          this.doctorAvailability = {
            onLeave: true,
            dates: [],
            time: ''
          };
        } else {
          // Generate some sample available dates (next 7 days)
          const dates = [];
          const today = new Date();
          
          for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
              dates.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
            }
          }
          
          this.doctorAvailability = {
            onLeave: false,
            dates: dates,
            time: '9:00 AM - 5:00 PM'
          };
        }
      }, 500);
    }
    
    this.moveToStep(3);
  }

  moveToStep(step: number): void {
    this.currentStep = step;
  }

  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        return !!this.selectedHospital;
      case 2:
        return !!this.selectedDoctor;
      case 3:
        return !!this.appointment.date && !!this.appointment.time && !!this.appointment.reason;
      case 4:
        return !!this.patient.name && !!this.patient.mobile && !!this.patient.address && 
               !!this.patient.district && !!this.patient.pincode;
      default:
        return false;
    }
  }

  submitAppointment(): void {
    this.showErrors = true;
    
    // Validate all steps
    const isStep1Valid = this.validateStep(1);
    const isStep2Valid = this.validateStep(2);
    const isStep3Valid = this.validateStep(3);
    const isStep4Valid = this.validateStep(4);
    
    if (isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid) {
      // Prepare payload
      const payload = {
        hospitalId: this.selectedHospital,
        doctorId: this.selectedDoctor,
        appointment: this.appointment,
        patient: this.patient
      };
      
      // Here you would typically call your API service
      console.log('Submitting appointment:', payload);
      
      // Simulate API call
      setTimeout(() => {
        alert('Appointment booked successfully!');
        this.resetForm();
      }, 1000);
    } else {
      // Scroll to first error
      setTimeout(() => {
        const firstErrorElement = document.querySelector('.is-invalid');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }

  resetForm(): void {
    this.selectedHospital = null;
    this.selectedDoctor = null;
    this.appointment = {
      date: null,
      time: null,
      reason: null
    };
    this.patient = {
      name: null,
      mobile: null,
      contact: null,
      whatsapp: null,
      address: null,
      district: null,
      pincode: null,
      referredBy: null
    };
    this.filteredDoctors = [];
    this.doctorAvailability = null;
    this.showErrors = false;
    this.currentStep = 1;
  }

  // Helper function to format time display
  formatTime(time: string | null): string {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    
    if (hourNum >= 12) {
      return `${hourNum === 12 ? 12 : hourNum - 12}:${minutes} PM`;
    } else {
      return `${hourNum === 0 ? 12 : hourNum}:${minutes} AM`;
    }
  }
}