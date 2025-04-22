import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DOCTOR_CONFIG_DASHBOARD_CONFIGURATION } from '@assets/constants/app.constants';
@Component({
  selector: 'app-doctor-config-dashboard',
  templateUrl: './doctor-config-dashboard.component.html',
  styleUrls: ['./doctor-config-dashboard.component.scss'],
})
export class DoctorConfigDashboardComponent {
  configList = DOCTOR_CONFIG_DASHBOARD_CONFIGURATION
  medicinePeriodForm: FormGroup;
  localStorageKey = 'medicinePeriods';
  typeForm: FormGroup;
  typeLocalStorageKey = 'medicineTypes';

  constructor(private router: Router, private fb: FormBuilder) {
    this.medicinePeriodForm = this.fb.group({
      periods: this.fb.array([]), // dynamic form array
    });
    this.typeForm = this.fb.group({
      types: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.loadTypesFromLocalStorage();
  }

  get types() {
    return this.typeForm.get('types') as FormArray;
  }

  addType(value: string = '', visibility: string = 'both') {
    this.types.push(
      this.fb.group({
        title: [value],
        visibility: [visibility],  // <-- Add this
      })
    );
  }
  

  removeType(index: number) {
    this.types.removeAt(index);
    this.saveTypesToLocalStorage();
  }

  saveTypesToLocalStorage() {
    localStorage.setItem(
      this.typeLocalStorageKey,
      JSON.stringify(this.typeForm.value.types)
    );
    console.log('Saved Medicine Types:', this.typeForm.value.types);
  }

  loadTypesFromLocalStorage() {
    const savedData = localStorage.getItem(this.typeLocalStorageKey);
    if (savedData) {
      const types = JSON.parse(savedData);
      types.forEach((t: any) => this.addType(t.title, t.visibility || 'both'));
    } else {
      this.addType();
    }
  }
  

  loadFromLocalStorage() {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      const periods = JSON.parse(savedData);
      periods.forEach((p: any) => this.addPeriod(p.title));
    } else {
      // Add one empty field by default
      this.addPeriod();
    }
  }
  get periods() {
    return this.medicinePeriodForm.get('periods') as FormArray;
  }

  addPeriod(value: string = '') {
    this.periods.push(
      this.fb.group({
        title: [value],
      })
    );
  }

  removePeriod(index: number) {
    this.periods.removeAt(index);
  }

  saveMedicinePeriods() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.medicinePeriodForm.value.periods)
    );
    console.log(
      'Saved to localStorage:',
      this.medicinePeriodForm.value.periods
    );
  }
  onToggleChange(type,config: any) {

    switch(type){
      case 'doctor':
        config.isEnabledForDoctor = !config.isEnabledForDoctor;
        console.log(
          `Config "${config.name}" toggled to:`,
          config.isEnabledForDoctor ? 'Active' : 'Inactive'
        );
        break;

      case 'opthal':
        config.isEnabledForOpthal = !config.isEnabledForOpthal;
        console.log(
          `Config "${config.name}" toggled to:`,
          config.isEnabledForOpthal ? 'Active' : 'Inactive'
        );
        break;
    }
  
  }

  handleAction(action: any) {
    switch (action.action) {
      case 'create-config':
        this.router.navigate([
          '/main/admin/doctor-config-dashboard/doctor-config',
        ]);
        break;

      case 'create-template':
        this.router.navigate([
          '/main/admin/doctor-config-dashboard/template-dashboard',
        ]);
        break;
    }
  }
}
