import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
interface EyeForm {
  title: string;
  form: any;
}
@Component({
  selector: 'app-opthal-view',
  templateUrl: './opthal-view.component.html',
  styleUrls: ['./opthal-view.component.scss']
})
export class OpthalViewComponent {
  visionForm: FormGroup;
  autoRefractionForm: FormGroup;
  cycloAutoRefractionForm: FormGroup;
  todaysGlassPrescription: FormGroup;
  aScanForm: FormGroup;
  forms: EyeForm[] = [];
  surgeryForm: FormGroup;
  wnlForm: FormGroup;  // Define form for WNL entries
  prescriptionData: any[] = [];
  dropdowns = [];
  constructor(private fb: FormBuilder) {
    this.visionForm = this.createEyeForm();
    this.autoRefractionForm = this.createEyeForm();
    this.cycloAutoRefractionForm = this.createEyeForm();
    this.todaysGlassPrescription = this.createEyeForm();
    this.aScanForm = this.createAScanForm();
    this.wnlForm = this.createWNLForm();  // Initialize WNL form

    this.surgeryForm = this.fb.group({
      surgeryAdvice: [''],
      surgeryPlanDate: [''],
      surgeryStatus: [''],
      rightEyeAdmission: [''],
      leftEyeAdmission: [''],
      rightEyeSurgery: [''],
      leftEyeSurgery: [''],
      rightEyeDischarge: [''],
      leftEyeDischarge: [''],
      rightEyeLens: [''],
      leftEyeLens: [''],
      rightEyePower: [''],
      leftEyePower: [''],
      rightEyeBatch: [''],
      leftEyeBatch: [''],
      otherItem: [''],
      finalDiagnosis: [''],
      conditionOnDischarge: [''],
      adviceRemarkPlan: ['']
    });
    
    this.forms = [
      { title: 'Vision Refraction 👁️', form: this.visionForm },
      { title: 'Auto Refraction 👁️', form: this.autoRefractionForm },
      { title: 'Cyclo Auto Refraction 👁️', form: this.cycloAutoRefractionForm },
      { title: "Today's Glass Prescription 👁️", form: this.todaysGlassPrescription }
    ];
  }

  ngOnInit(){
    this.loadAScanData(); // Load on init
    this.loadWNLData(); // Load WNL data on init
    let data = JSON.parse(localStorage.getItem("view"))
    this.dropdowns = data.filter((data)=> data.type === 'Opthal' || data.type === 'Both')
  }

  createWNLForm(): FormGroup {
    return this.fb.group({
      entries: this.fb.array([])
    });
  }

  get wnlEntries() {
    return this.wnlForm.get('entries') as FormArray;
  }
  submitSurgeryDetails() {
    console.log(this.surgeryForm.value);
  }

  onPrescriptionUpdate(data: any[]) {
    this.prescriptionData = data;
    console.log('Updated Prescription Data:', this.prescriptionData);
  }

  addWNLData() {
    const entry = this.fb.group({
      title: [''],
      re: [''],
      le: [''],
      saved: [false]  // flag to track saved status
    });
    this.wnlEntries.push(entry);
  }

  deleteWNLData(index: number) {
    this.wnlEntries.removeAt(index);
  }

  saveWNLData(id: string) {
    const data = this.wnlForm.value;
    // Set saved flag to true for all entries
    this.wnlEntries.controls.forEach(control => control.get('saved')?.setValue(true));
    localStorage.setItem(`wnl-${id}`, JSON.stringify(data));
    alert('WNL data saved!');
  }

  loadWNLData(id: string = 'yourUniqueId') {
    const saved = localStorage.getItem(`wnl-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      this.wnlEntries.clear(); // clear existing
      parsed.entries.forEach((entry: any) => {
        this.wnlEntries.push(this.fb.group(entry));
      });
    } else {
      this.addWNLData(); // Add one row by default
    }
  }


  createAScanForm(): FormGroup {
    return this.fb.group({
      entries: this.fb.array([])
    });
  }
  
  get entries() {
    return this.aScanForm.get('entries') as FormArray;
  }
  
  addAScanEntry() {
    const entry = this.fb.group({
      title: [''],
      re: [''],
      le: [''],
      saved: [false]  // new field to track if this entry has been saved
    });
    this.entries.push(entry);
  }
  
  deleteAScanEntry(index: number) {
    this.entries.removeAt(index);
  }
  
  saveAScanData(id: string) {
    const data = this.aScanForm.value;
    // Set saved flag to true for all entries
    this.entries.controls.forEach(control => control.get('saved')?.setValue(true));
    localStorage.setItem(`aScan-${id}`, JSON.stringify(data));
    alert('A-Scan data saved!');
  }
  
  loadAScanData(id: string = 'yourUniqueId') {
    const saved = localStorage.getItem(`aScan-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      this.entries.clear(); // clear existing
      parsed.entries.forEach((entry: any) => {
        this.entries.push(this.fb.group(entry));
      });
    } else {
      this.addAScanEntry(); // Add one row by default
    }
  }
  createEyeForm(): FormGroup {
    return this.fb.group({
      distance: this.fb.group({
        reSph: [''], reCyl: [''], reAxis: [''], reVision: [''],
        leSph: [''], leCyl: [''], leAxis: [''], leVision: ['']
      }),
      near: this.fb.group({
        reSph: [''], reCyl: [''], reAxis: [''], reVision: [''],
        leSph: [''], leCyl: [''], leAxis: [''], leVision: ['']
      }),
      add: this.fb.group({
        be: [''], re: [''], le: ['']
      }),
      glassDetails: this.fb.group({
        type: [''], color: [''], use: [''], pd: ['']
      })
    });
  }

  calculate(form: FormGroup) {
    const reAdd = parseFloat(form.get('add.re')?.value) || 0;
    const leAdd = parseFloat(form.get('add.le')?.value) || 0;

    if (reAdd && leAdd) {
      const beAdd = ((reAdd + leAdd) / 2).toFixed(2);
      form.get('add.be')?.setValue(beAdd);
    } else {
      alert('Please enter both RE Add and LE Add to calculate BE Add.');
    }
  }

  submitEyeForms() {
    this.forms.forEach(({ title, form }) => {
      console.log(`${title} Data:`, form.value);
    });
  }
}
