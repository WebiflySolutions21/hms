import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './template-dashboard.component.html',
  styleUrls: ['./template-dashboard.component.scss'],
})
export class TemplateDashboardComponent {
  templates: any[] = [];
  showTemplateForm = false;
  currentTitle = '';
  currentPrescription: any[] = [];

  createTemplate() {
    this.showTemplateForm = true;
    this.currentTitle = '';
    this.currentPrescription = [];
  }

  onToggleChange(template: any) {
    // template.isEnabled = !template.isEnabled;
    console.log(
      `Config "${template.title}" toggled to:`,
      template.isEnabled ? 'Active' : 'Inactive'
    );
  }

  saveTemplate() {
    console.log('Saving Template Title:', this.currentTitle);

    this.templates.push({
      title: this.currentTitle,
      data: JSON.parse(JSON.stringify(this.currentPrescription)), // deep copy
    });
    localStorage.setItem("view_template",JSON.stringify(this.templates))
    this.showTemplateForm = false;
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
    console.log(this.templates);
  }

  loadTemplate(template: any) {
    this.showTemplateForm = true;
    this.currentTitle = template.title;
    this.currentPrescription = JSON.parse(JSON.stringify(template.data));
  }

  handlePrescriptionUpdate(data: any[]) {
    this.currentPrescription = data;
  }
}
