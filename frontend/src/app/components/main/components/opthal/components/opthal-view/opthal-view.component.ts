import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FOLLOW_UP_DETAILS } from '@assets/constants/doctor.constants';
import { Modal } from 'bootstrap';
import { EventEmitterService } from 'src/app/core/services';

interface EyeForm {
  title: string;
  form: any;
}
@Component({
  selector: 'app-opthal-view',
  templateUrl: './opthal-view.component.html',
  styleUrls: ['./opthal-view.component.scss'],
})
export class OpthalViewComponent {
  visionForm: FormGroup;
  autoRefractionForm: FormGroup;
  cycloAutoRefractionForm: FormGroup;
  todaysGlassPrescription: FormGroup;
  visualAquityForm: FormGroup;
  aScanForm: FormGroup;
  forms: EyeForm[] = [];
  surgeryForm: FormGroup;
  wnlForm: FormGroup; // Define form for WNL entries
  prescriptionData: any[] = [];
  dropdowns = [];
  showFollowup = false;
  isFollowupOpen = false;
  selectedDate: string = '';
  followupDay: string = '';
  followupDuration: string = '';
  followupDate: string = '';
  selectedCheckboxes = [];
  followupOptions = FOLLOW_UP_DETAILS;
  isAdmitted = false;
  showReferDropdown = false;
  selectedDoctor: any = null;
  searchQuery = '';
  titleData: any;
  filteredDoctors: any;
  doctors = [
    { id: 1, name: 'Dr. Sharma' },
    { id: 2, name: 'Dr. Patel' },
    { id: 3, name: 'Dr. Nair' },
    { id: 4, name: 'Dr. Mehta' },
    { id: 5, name: 'Dr. Rao' },
  ];
  @ViewChild('templateModal', { static: false })
  templateModalRef!: ElementRef;
  private templateModal!: Modal;
  @ViewChild('admitPatientModal', { static: false })
  admitPatientModalRef!: ElementRef;
  private admitPatientModal!: Modal;
  @ViewChild('followUpPatientModal', { static: false })
  followUpPatientModalRef!: ElementRef;
  private followUpPatientModal!: Modal;
  @ViewChild('referUpPatientModal', { static: false })
  referUpPatientModalRef!: ElementRef;
  private referUpPatientModal!: Modal;
  quadrants = {
    topLeft: '',
    topRight: '',
    bottomLeft: '',
    bottomRight: '',
  };

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private eventEmitterService: EventEmitterService,
    private router:Router
  ) {
    this.visionForm = this.createEyeForm();
    this.autoRefractionForm = this.createEyeForm();
    this.cycloAutoRefractionForm = this.createEyeForm();
    this.todaysGlassPrescription = this.createEyeForm();
    this.aScanForm = this.createAScanForm();
    this.wnlForm = this.createWNLForm(); // Initialize WNL form
    this.visualAquityForm = this.createVisualAquityForm();
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
      adviceRemarkPlan: [''],
    });

    this.forms = [
      { title: 'Vision Refraction 👁️', form: this.visionForm },
      { title: 'Visual Aquity 👁️', form: this.visualAquityForm },
      { title: 'Auto Refraction 👁️', form: this.autoRefractionForm },
      { title: 'Cyclo Auto Refraction 👁️', form: this.cycloAutoRefractionForm },
      {
        title: "Today's Glass Prescription 👁️",
        form: this.todaysGlassPrescription,
      },
    ];
  }
// In your component class
allSectionsVisible = true;

sectionVisibility = {
  diagnosis: true,
  visionRefraction: true,
  visualAquity: true,
  autoRefraction: true,
  cycloAutoRefraction: true,
  glassPrescription: true,
  wnl: true,
  aScan: true,
  prescription: true,
  surgery: true
};

sections = [
  { id: 'diagnosis', label: 'Diagnosis', visible: true },
  { id: 'visionRefraction', label: 'Vision Refraction', visible: true },
  { id: 'visualAquity', label: 'Visual Aquity', visible: true },
  { id: 'autoRefraction', label: 'Auto Refraction', visible: true },
  { id: 'cycloAutoRefraction', label: 'Cyclo Refraction', visible: true },
  { id: 'glassPrescription', label: 'Glass Prescription', visible: true },
  { id: 'wnl', label: 'WNL', visible: true },
  { id: 'aScan', label: 'A-Scan', visible: true },
  { id: 'prescription', label: 'Prescription', visible: true },
  { id: 'surgery', label: 'Surgery', visible: true }
];

// In your component class
toggleSection(section: any) {
  section.visible = !section.visible;
  this.sectionVisibility[section.id] = section.visible;
  this.updateAllVisibleState();
}

toggleAllSections() {
  this.allSectionsVisible = !this.allSectionsVisible;
  this.sections.forEach(section => {
    section.visible = this.allSectionsVisible;
    this.sectionVisibility[section.id] = this.allSectionsVisible;
  });
}

private updateAllVisibleState() {
  this.allSectionsVisible = this.sections.every(s => s.visible);
}

getFormVisibility(title: string): boolean {
  const mapping: {[key: string]: string} = {
    'Vision Refraction 👁️': 'visionRefraction',
    'Visual Aquity 👁️': 'visualAquity',
    'Auto Refraction 👁️': 'autoRefraction',
    'Cyclo Auto Refraction 👁️': 'cycloAutoRefraction',
    "Today's Glass Prescription 👁️": 'glassPrescription'
  };
  
  const visibilityId = mapping[title];
  return visibilityId ? this.sectionVisibility[visibilityId] : true;
}

  ngOnInit() {
    this.loadAScanData(); // Load on init
    this.loadWNLData(); // Load WNL data on init
    let data = JSON.parse(localStorage.getItem('view'));
    this.dropdowns = data.filter(
      (data) => data.type === 'Opthal' || data.type === 'Both'
    );
    let templateData = JSON.parse(localStorage.getItem('view_template'));
    this.eventEmitterService.on('open-template-modal-opthal', (data) => {
      this.titleData = templateData.filter(
        (data) => data.visibility === 'Opthal' || data.visibility === 'Both'
      );
      this.openModal('template');
    });
  }

  useTemplate(data: any) {
    this.prescriptionData = data.data;
    if (this.templateModal) {
      this.templateModal.hide();
    }
  }

  ngAfterViewInit() {
    if (this.admitPatientModalRef) {
      this.admitPatientModal = new Modal(
        this.admitPatientModalRef.nativeElement
      );
    }
    if (this.followUpPatientModalRef) {
      this.followUpPatientModal = new Modal(
        this.followUpPatientModalRef.nativeElement
      );
    }

    if (this.referUpPatientModalRef) {
      this.referUpPatientModal = new Modal(
        this.referUpPatientModalRef.nativeElement
      );
    }
    if (this.templateModalRef) {
      this.templateModal = new Modal(this.templateModalRef.nativeElement);
    }
  }

  openModal(type: 'admit' | 'followup' | 'refer' | 'template') {
    if (type === 'admit' && this.admitPatientModal) {
      this.admitPatientModal.show();
    } else if (type === 'followup' && this.followUpPatientModal) {
      this.followUpPatientModal.show();
    } else if (type === 'refer' && this.referUpPatientModal) {
      this.referUpPatientModal.show();
    } else if (type === 'template' && this.templateModal) {
      this.templateModal.show();
    }
  }

  closeModal() {
    if (this.admitPatientModal) {
      this.admitPatientModal.hide();
    }

    if (this.followUpPatientModal) {
      console.log('Follow-up modal closed');
      this.followUpPatientModal.hide();
    }
    if (this.referUpPatientModal) {
      this.referUpPatientModal.hide();
    }
    if (this.templateModal) {
      this.templateModal.hide();
    }
  }

  admitPatient() {
    this.isAdmitted = true;
    this.closeModal();
  }

  toggleReferDropdown() {
    this.showReferDropdown = !this.showReferDropdown;
    if (this.showReferDropdown) {
      this.filteredDoctors = [...this.doctors]; // Reset only when opening
      this.searchQuery = ''; // Clear search input
    }
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.cdr.detectChanges(); // Force UI update
  }

  selectDoctor(doctor: any) {
    this.selectedDoctor = doctor;
  }

  referPatient() {
    if (this.selectedDoctor) {
      console.log(`Patient referred to ${this.selectedDoctor.name}`);
      alert(`Patient referred to Dr. ${this.selectedDoctor.name}`);
      this.showReferDropdown = false; // Hide dropdown after refer
      this.selectedDoctor = null;
      this.searchQuery = '';
      this.closeModal();
    }
  }

  toggleFollowup() {
    this.isFollowupOpen = !this.isFollowupOpen;
  }

  onDateChange(event: any) {
    const selected = new Date(event.target.value);
    this.selectedDate = event.target.value;
    this.followupDay = selected.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    this.calculateFollowupDate();
  }

  onDurationChange(days: number) {
    this.followupDuration = `${days} days`;
    this.calculateFollowupDate(days);
  }

  calculateFollowupDate(days: number = 0) {
    let selected = this.selectedDate ? new Date(this.selectedDate) : new Date();
    selected.setDate(selected.getDate() + days);

    this.followupDate = selected.toISOString().split('T')[0]; // Format YYYY-MM-DD
    this.followupDay = selected.toLocaleDateString('en-US', {
      weekday: 'long',
    });

    console.log('Follow-up Date:', this.followupDate);
    console.log('Follow-up Day:', this.followupDay);
    this.toggleFollowup();
  }

  createWNLForm(): FormGroup {
    return this.fb.group({
      entries: this.fb.array([]),
    });
  }
  
  createWNLRow(): FormGroup {
    return this.fb.group({
      title: [''],
      re: [''],
      le: [''],
      reTopLeft: [''],
      reTopRight: [''],
      reBottomLeft: [''],
      reBottomRight: [''],
      leTopLeft: [''],
      leTopRight: [''],
      leBottomLeft: [''],
      leBottomRight: [''],
      saved: [false],
    });
  }
  
  get wnlEntries() {
    return this.wnlForm.get('entries') as FormArray;
  }

  onPrescriptionUpdate(data: any[]) {
    this.prescriptionData = data;
    console.log('Updated Prescription Data:', this.prescriptionData);
  }

  addWNLData() {
    const entries = this.wnlForm.get('entries') as FormArray;
    entries.push(this.createWNLRow());
  }

  deleteWNLData(index: number) {
    this.wnlEntries.removeAt(index);
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
      entries: this.fb.array([]),
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
      saved: [false], // new field to track if this entry has been saved
    });
    this.entries.push(entry);
  }

  deleteAScanEntry(index: number) {
    this.entries.removeAt(index);
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
        reSph: [''],
        reCyl: [''],
        reAxis: [''],
        reVision: [''],
        leSph: [''],
        leCyl: [''],
        leAxis: [''],
        leVision: [''],
      }),
      near: this.fb.group({
        reSph: [''],
        reCyl: [''],
        reAxis: [''],
        reVision: [''],
        leSph: [''],
        leCyl: [''],
        leAxis: [''],
        leVision: [''],
      }),
      add: this.fb.group({
        be: [''],
        re: [''],
        le: [''],
      }),
      glassDetails: this.fb.group({
        type: [''],
        color: [''],
        use: [''],
        pd: [''],
      }),
    });
  }

  createVisualAquityForm() {
    return this.fb.group({
      distanceVision: this.fb.group({ reDV: [''], leDV: [''] }),
      vaph: this.fb.group({ reVAPH: [''], leVAPH: [''] }),
      nearVision: this.fb.group({ reNearVision: [''], leNearVision: [''] }),
      vaSpect: this.fb.group({ reVASpect: [''], leVASpect: [''] }),
      colorVision: this.fb.group({ reColorVision: [''], leColorVision: [''] }),
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

  onSelectionChanged(selectedOptions) {
    if (selectedOptions.length) {
      selectedOptions.forEach((option) => {
        // Check if the label already exists in selectedCheckboxes
        let existingLabelIndex = this.selectedCheckboxes.findIndex(
          (item) => Object.keys(item)[0] === option.key
        );
        // Prepare a dynamic list of options without duplicates
        const dynamicOptions = option.options.map((opt) => ({
          id: opt.id,
          name: opt.name,
        }));

        if (existingLabelIndex !== -1) {
          // Replace existing data with the new data
          this.selectedCheckboxes[existingLabelIndex] = {
            [option.key]: dynamicOptions,
            isPrintable: option.isPrintEnabled,
          };
        } else {
          // Create a new label object with the dynamic options
          let newOption = {
            [option.key]: dynamicOptions,
            isPrintable: option.isPrintEnabled,
          };
          this.selectedCheckboxes.push(newOption);
        }
      });

      console.log(this.selectedCheckboxes);
    }
  }

  // save(arg?) {
  //  let sectionFormData= this.forms.forEach(({ title, form }) => {
  //     console.log(`${title} Data:`, form.value);
  //   });
  //   // const data2 = this.aScanForm.value;

  //   // this.entries.controls.forEach(control => control.get('saved')?.setValue(true));
  //   // localStorage.setItem(`aScan-${'id'}`, JSON.stringify(data2));
  //   // const data = this.wnlForm.value;
  //   // Set saved flag to true for all entries
  //   // this.wnlEntries.controls.forEach(control => control.get('saved')?.setValue(true));
  //   // localStorage.setItem(`wnl-${'id'}`, JSON.stringify(data));
  //   // console.log(this.surgeryForm.value);

  //   let payload = {
  //     sectionForms:sectionFormData,
  //     followupDate: this.followupDate || null,
  //     followupDay: this.followupDay || null,
  //     isAdmitted: this.isAdmitted ? this.isAdmitted : false,
  //     referDoctor: this.selectedDoctor || null,
  //     prescriptionData: this.prescriptionData || [],
  //     selectedCheckboxes: this.selectedCheckboxes,
  //     aScan: this.aScanForm.value,
  //     wnl: this.wnlForm.value,
  //     surgery: this.surgeryForm.value,
  //   };
  //   this.router.navigate(['main/opthal/opthal-print'])
  //   console.log('payload', payload);
  // }

  save(arg?) {

    //FOR VISIBILITY
    const visibleForms = this.forms.filter(form => 
      this.getFormVisibility(form.title)
    ).map(({ title, form }) => ({
      title,
      data: form.value
    }));
  
    // Prepare the payload with only visible sections
    // const payload = {
    //   sectionForms: visibleForms,
    //   followupDate: this.followupDate || null,
    //   followupDay: this.followupDay || null,
    //   isAdmitted: this.isAdmitted ? this.isAdmitted : false,
    //   referDoctor: this.selectedDoctor || null,
    //   prescriptionData: this.sectionVisibility.prescription ? this.prescriptionData : [],
    //   selectedCheckboxes: this.sectionVisibility.diagnosis ? this.selectedCheckboxes : [],
    //   aScan: this.sectionVisibility.aScan ? this.aScanForm.value : null,
    //   wnl: this.sectionVisibility.wnl ? this.wnlForm.value : null,
    //   surgery: this.sectionVisibility.surgery ? this.surgeryForm.value : null,
    // };
    let sectionFormData = this.forms.map(({ title, form }) => {
      console.log(`${title} Data:`, form.value);
      return {
        title,
        data: form.value
      };
    });
  
    let payload = {
      sectionForms: sectionFormData,
      followupDate: this.followupDate || null,
      followupDay: this.followupDay || null,
      isAdmitted: this.isAdmitted ? this.isAdmitted : false,
      referDoctor: this.selectedDoctor || null,
      prescriptionData: this.prescriptionData || [],
      selectedCheckboxes: this.selectedCheckboxes,
      aScan: this.aScanForm.value,
      wnl: this.wnlForm.value,
      surgery: this.surgeryForm.value,
    };
  
    this.router.navigate(['main/opthal/opthal-print']);
    console.log('payload', payload);
  }
  
}
