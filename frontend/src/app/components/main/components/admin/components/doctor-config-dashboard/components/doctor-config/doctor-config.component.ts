import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
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

  saveChanges() {
    this.viewValue.push( this.formData );
    console.log('Saved data:', this.formData);
    localStorage.setItem('view', JSON.stringify(this.viewValue));
    
  }
}
