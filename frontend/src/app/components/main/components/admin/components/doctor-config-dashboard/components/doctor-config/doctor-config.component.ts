import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
declare var bootstrap: any;
@Component({
  selector: 'app-doctor-config',
  templateUrl: './doctor-config.component.html',
  styleUrls: ['./doctor-config.component.scss'],
})

export class DoctorConfigComponent {
  formData = {
    heading: '',
    key: '',
    showPrintToggle: false,
    showMic: false,
    options: [],
  };
  viewValue: any = [];
  data = []
  ngOnInit(){
    this.data = JSON.parse(localStorage.getItem("view"))
  }
  generateKey() {
    this.formData.key = this.formData.heading
      .toLowerCase()
      .replace(/\s+/g, '_');
  }

  toggleOptions(form: any) {
    form.showAllOptions = !form.showAllOptions;
  }

  addOption() {
    this.formData.options.push({
      id: uuidv4(),
      name: '',
      value: '',
    });
  }

  removeOption(index: number) {
    this.formData.options.splice(index, 1);
  }
  editingIndex: number | null = null;

  editForm(form: any, index: number) {
    this.formData = JSON.parse(JSON.stringify(form));  // Deep clone to avoid live binding
    this.editingIndex = index;
  
    // Open the modal programmatically
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  

  saveChanges() {
    if (this.editingIndex !== null) {
      // Edit mode
      this.data[this.editingIndex] = { ...this.formData };
    } else {
      // Add new mode
      this.data.push({ ...this.formData });
    }
  
    localStorage.setItem('view', JSON.stringify(this.data));
    this.resetForm();
  
    // Close modal
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  resetForm() {
    this.formData = {
      heading: '',
      key: '',
      showPrintToggle: false,
      showMic: false,
      options: [],
    };
    this.editingIndex = null;
  }
  deleteForm(form: any) {
    const index = this.data.indexOf(form);
    if (index > -1) {
      this.data.splice(index, 1);
      localStorage.setItem('view', JSON.stringify(this.data));
    }
  }
    
  
}
