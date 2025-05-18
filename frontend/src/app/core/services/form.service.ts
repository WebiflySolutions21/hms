import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormConfig } from '@assets/constants/form.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private registrationForm: any;
  private readonly STORAGE_KEY = 'dynamicForms';
  private formsData: any;

  constructor(private httpClient: HttpClient) {
    this.registrationForm = null;
  }

  getForms(hospId?) {
    return this.httpClient.get(`${environment.API_HOST}/form/list?id=${hospId ? hospId:1}`);
  }

  updateForm(payload) {
    return this.httpClient.put(`${environment.API_HOST}/form/update`, payload);
  }

  // Delete form by ID
  deleteForm(payload) {
    return this.httpClient.delete(
      `${environment.API_HOST}/form/delete`,
      payload
    );
  }

  // Save form to localStorage
  saveForm(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/form/create`, payload);
  }

  setAllFormsData(formsData: any) {
    this.formsData = formsData;
  }

  // Get all forms
  getAllForms(): any {
    return this.formsData;
  }

  getFormTitle(formId: string): string {
    const form = this.getFormById(formId);
    return form ? form.name : 'Unknown Form';
  }

  getFieldLabel(formId: string, fieldId: string): string {
    const form = this.getFormById(formId);
    if (!form) return 'Unknown Field';

    for (const section of form.json.sections) {
      const field = section.fields.find((f) => f.id === fieldId);
      if (field) return field.label;
    }

    return 'Unknown Field';
  }

  getFormById(id: string | number): any | undefined {
    const forms = this.getAllForms();
    const numericId = Number(id); // convert to number
    // console.log('formIdge', numericId);
    return forms.find((form) => form.id === numericId);
  }

  // Generate a new form ID
  generateId(): string {
    return (
      'form_' +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2)
    );
  }

  // Get count of all saved forms
  getFormsCount(): number {
    return this.getAllForms().length;
  }

  // Get recently created forms (optional)
  getRecentForms(limit: number = 5): FormConfig[] {
    const forms = this.getAllForms();
    return forms
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  }

  // Existing registration form methods
  setRegistrationForm(formData: any) {
    this.registrationForm = formData;
  }

  getRegistrationForm() {
    return this.registrationForm;
  }

  // New method to clone a form (for import functionality)
  cloneForm(form: FormConfig): FormConfig {
    return {
      ...JSON.parse(JSON.stringify(form)),
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
  }
  // Add this to your FormService
  formExists(id: string): boolean {
    return this.getAllForms().some((form) => form.id === id);
  }
  // Add to your FormService
  private readonly REGISTER_KEY = 'formRegisters';

  saveRegister(formId: string, registerData: any): void {
    const registers = this.getAllRegisters();
    registers[formId] = registerData;
    localStorage.setItem(this.REGISTER_KEY, JSON.stringify(registers));
  }

  getRegister(formId: string): any {
    const registers = this.getAllRegisters();
    return registers[formId] || null;
  }

  getAllRegisters(): { [key: string]: any } {
    const registersJson = localStorage.getItem(this.REGISTER_KEY);
    return registersJson ? JSON.parse(registersJson) : {};
  }

  formHasRegister(formId: string): boolean {
    return !!this.getRegister(formId);
  }
}
