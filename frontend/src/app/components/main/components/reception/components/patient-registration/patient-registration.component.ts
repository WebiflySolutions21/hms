import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
import { PatientService } from 'src/app/core/services';
interface Patient {
  id: number;
  name: string;
  mobile: string;
  dob: string;
  age: number;
  sex: string;
  address: string;
  taluka: string;
  district: string;
  consultant: string;
  visitType: string;
}

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {
  patientForm!: FormGroup;
  uploadedPicFile!: File;
  uploadedImageUrl: string | null = null;
  consultants: string[] = [
    'Dr. Eknath Pawar',
    'Dr. Amit Deshmukh',
    'Dr. Priya Kulkarni',
    'Dr. Rakesh Patil',
  ];
  livePicFile: any;
  visitTypes: string[] = [
    'General Checkup',
    'Eye Checkup',
    'Dental Visit',
    'Emergency',
    'Follow-up',
  ];
  @ViewChild('barcode') barcodeElement!: ElementRef;
  patientId: string = '';
  showSearchBar: boolean = false;
  searchQuery: string = '';
  searchResults: Patient[] = [];
  selectedPatient: Patient | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  imagePreview: string | null = null;
  isCameraOpen: any;
  cameraImagePreview: any;
  savedPicture = false;

  // Mock existing patient data (replace with real API data)
  existingPatients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '1234567890',
      dob: '1990-05-15',
      age: 32,
      sex: 'Male',
      address: '123 Street',
      taluka: 'Taluka A',
      district: 'District X',
      consultant: 'Dr. Eknath Pawar',
      visitType: 'General Checkup',
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '9876543210',
      dob: '1985-10-20',
      age: 37,
      sex: 'Female',
      address: '456 Avenue',
      taluka: 'Taluka B',
      district: 'District Y',
      consultant: 'Dr. Priya Kulkarni',
      visitType: 'Eye Checkup',
    },
    {
      id: 3,
      name: 'Lokesh Thakare',
      mobile: '7218509409',
      dob: '1985-10-20',
      age: 37,
      sex: 'Female',
      address: '456 Avenue',
      taluka: 'Taluka B',
      district: 'District Y',
      consultant: 'Dr. Priya Kulkarni',
      visitType: 'Eye Checkup',
    },
  ];
  formValues: { [key: string]: any } = {};
  form: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();

    // Trigger search when the search query changes
    this.patientForm
      .get('searchQuery')
      ?.valueChanges.subscribe((query: string) => {
        this.searchPatients(query);
      });

    this.patientId = 'P' + Date.now().toString();
    this.getFormDetails();
  }

  initializeForm() {
    this.patientForm = this.fb.group({
      oldPatient: ['no', Validators.required],
      consultant: ['', Validators.required],
      visitType: ['', Validators.required],
      searchQuery: [''],
    });
  }

  autoFillForm(formId?, patientId?) {
    const submissionKey = `form_submission_${formId}_patient_${patientId}`;
    const savedSubmission = localStorage.getItem(submissionKey);
    if (savedSubmission) {
      const submission = JSON.parse(savedSubmission);
      this.formValues = submission.values;
      this.patientForm.patchValue({
        consultant: this.formValues['consultant'],
        visitType: this.formValues['visitType'],
      });
    }
  }

  getFormDetails() {
    const stored = localStorage.getItem('dynamicForms');
    if (stored) {
      const forms = JSON.parse(stored);
      this.form = forms.find(
        (f: any) =>
          f.title === 'Patient Registration Form' &&
          f.formVisibility.some((v: any) =>
            v.loginTypes.some((lt: any) => lt.name === 'Receptionist')
          )
      );
    }
    if (this.form) {
      this.form.sections.forEach((section) => {
        section.fields.forEach((field) => {
          this.setDefaultDateTimeValues(field);
        });
      });
    }
  }

  private setDefaultDateTimeValues(field: any) {
    if (!this.formValues[field.id]) {
      const now = new Date();

      switch (field.type) {
        case 'date':
          // Format as YYYY-MM-DD
          this.formValues[field.id] = now.toISOString().split('T')[0];
          break;

        case 'time':
          // Format as HH:MM
          this.formValues[field.id] = now.toTimeString().substring(0, 5);
          break;

        case 'datetime-local':
          // Format as YYYY-MM-DDTHH:MM
          const datePart = now.toISOString().split('T')[0];
          const timePart = now.toTimeString().substring(0, 5);
          this.formValues[field.id] = `${datePart}T${timePart}`;
          break;
      }
    }
  }

  onFileChange(event: any, field: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Validate file size if specified
      if (field.maxSize) {
        const maxBytes = field.maxSize * 1024 * 1024;
        for (let file of files) {
          if (file.size > maxBytes) {
            alert(
              `File ${file.name} exceeds maximum size of ${field.maxSize}MB`
            );
            event.target.value = ''; // Clear selection
            return;
          }
        }
      }

      // Store files in form values
      if (field.multiple) {
        this.formValues[field.id] = Array.from(files);
      } else {
        this.formValues[field.id] = files[0];
      }
    }
  }

  removeFile(field: any, fileToRemove?: File) {
    if (field.multiple && fileToRemove) {
      const files = this.formValues[field.id] as File[];
      this.formValues[field.id] = files.filter((file) => file !== fileToRemove);
    } else {
      this.formValues[field.id] = null;
      // Reset file input
      const input = document.getElementById(field.id) as HTMLInputElement;
      if (input) input.value = '';
    }
  }

  onMultiCheckboxChange(event: Event, fieldId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (!this.formValues[fieldId]) {
      this.formValues[fieldId] = [];
    }

    if (checkbox.checked) {
      this.formValues[fieldId].push(checkbox.value);
    } else {
      this.formValues[fieldId] = this.formValues[fieldId].filter(
        (val: string) => val !== checkbox.value
      );
    }
  }

  generateBarcode(): void {
    if (this.barcodeElement) {
      JsBarcode(this.barcodeElement.nativeElement, this.patientId, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: true,
      });
    }
    // Get SVG string
    const svgString = new XMLSerializer().serializeToString(
      this.barcodeElement.nativeElement
    );
    console.log('SVG Barcode:', svgString);
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedPicFile = file; // <- Store the actual file for FormData
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onPatientTypeChange(type: string): void {
    this.showSearchBar = type === 'yes';
    if (!this.showSearchBar) {
      this.searchQuery = '';
      this.searchResults = [];
      this.selectedPatient = null;
      // Only reset relevant fields, not the entire form
      this.patientForm.patchValue({
        searchQuery: '',
        consultant: '',
        visitType: '',
      });
    }
  }

  // Enhanced search with debounce
  searchPatients(query: string): void {
    if (!query?.trim()) {
      this.searchResults = [];
      return;
    }

    query = query.toLowerCase().trim();

    // Search through all patient properties
    this.searchResults = this.existingPatients.filter((patient) =>
      Object.values(patient).some((val) =>
        val?.toString().toLowerCase().includes(query)
      )
    );
  }

  // Select patient with more details
  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.searchResults = []; // Clear search results but keep the query

    // Auto-fill form fields
    this.patientForm.patchValue({
      consultant: patient.consultant,
      visitType: patient.visitType,
    });

    // Load any additional form data from storage
    this.autoFillForm(this.form?.id, patient.id);
  }
  // Clear search results
  clearSearch(): void {
    this.patientForm.get('searchQuery')?.reset();
    this.searchResults = [];
  }

  // Clear selected patient
  clearSelection(): void {
    this.selectedPatient = null;
    this.patientForm.patchValue({
      consultant: '',
      visitType: '',
    });
  }
  async submitForm() {
    // Construct one single object for storage
    const submissionObject: { [key: string]: any } = {
      formId: this.form.id,
      patientId: this.patientId,
      values: {},
    };

    // Loop through formValues and assign to values
    for (const key in this.formValues) {
      const value = this.formValues[key];

      if (value instanceof File) {
        // Skip actual file data for localStorage
        submissionObject['values'][key] = 'FILE_NOT_STORED';
      } else if (Array.isArray(value) && value[0] instanceof File) {
        submissionObject['values'][key] = value.map(() => 'FILE_NOT_STORED');
      } else {
        submissionObject['values'][key] = value;
      }
    }
    console.log(this.patientForm.value);
    // Add live picture info
    if (this.livePicFile) {
      submissionObject['values']['patientLivePic'] = this.livePicFile;
    }

    submissionObject['values']['consultant'] =
      this.patientForm.value.consultant;
    submissionObject['values']['visitType'] = this.patientForm.value.visitType;
    submissionObject['values']['oldPatient'] =
      this.patientForm.value.oldPatient;

    // Store into localStorage as one single JSON object
    const submissionKey = `form_submission_${this.form.id}_patient_${this.patientId}`;
    localStorage.setItem(submissionKey, JSON.stringify(submissionObject));

    console.log('Form saved as object:', submissionObject);
    alert('Form data saved (files not stored in localStorage)');

    // If you still want to send files, use FormData for API submission
    const formData = new FormData();
    for (const key in this.formValues) {
      const value = this.formValues[key];

      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value) && value[0] instanceof File) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}_${i}`, value[i]);
        }
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }

    formData.append('formId', this.form.id);
    formData.append('patientId', this.patientId);
    if (this.livePicFile) {
      formData.append('patientLivePic', this.livePicFile);
    }

    console.log('FormData prepared for API:', formData);
  }

  // onSubmit() {
  //   this.generateBarcode();
  //   const formData = new FormData();

  //   Object.entries(this.patientForm.value).forEach(([key, value]) => {
  //     if (value !== null && value !== undefined) {
  //       formData.append(key, value.toString());
  //     }
  //   });
  //   formData.append('patientId', this.patientId);

  //   // Append file uploads
  //   if (this.livePicFile) {
  //     formData.append('patientLivePic', this.livePicFile);
  //   }
  //   if (this.uploadedPicFile) {
  //     formData.append('imageUploaded', this.uploadedPicFile);
  //   }

  //   this.patientService.savePatient(formData).subscribe((res) => {
  //     console.log('Patient registered!', res);
  //   });
  // }
  openCamera() {
    this.isCameraOpen = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  capturePhoto() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      this.cameraImagePreview = dataUrl;
      this.livePicFile = this.dataURLToFile(dataUrl, 'live-photo.png');
      this.stopCamera();
    }
  }

  // Convert base64 to File
  dataURLToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  retakePhoto() {
    this.cameraImagePreview = null;
    this.savedPicture = false;
    this.openCamera();
  }

  savePhoto() {
    this.savedPicture = true;

    alert('Photo saved successfully!');
  }

  stopCamera() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    this.isCameraOpen = false;
  }
}
