import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/services';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss'],
})
export class FormViewerComponent implements OnInit {
  form: any;
  formValues: { [key: string]: any } = {};
  patientId = '1';
  uploadedFiles: { [key: string]: File[] } = {};

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const stored = localStorage.getItem('dynamicForms');
    if (stored) {
      const forms = JSON.parse(stored);
      this.form = forms.find((f: any) => f.id === id);
  
      if (this.form) {
        this.form.sections.forEach((section) => {
          section.fields.forEach((field) => {
            if (field.referencesField) {
              // Set up a way to watch for changes to referenced fields
              // this.watchReferencedField(field);
              this.formValues[field.id]=this.getReferencedValue(field)
            } else if (field.type === 'template') {
              // For template fields, we need to watch all referenced fields
              this.watchTemplateFieldReferences(field);
            } else {
              this.setDefaultDateTimeValues(field);
            }
          });
        });
      }
    }

    // Load existing submission if available
    const submissionKey = `form_submission_${id}_patient_${this.patientId}`;
    const savedSubmission = localStorage.getItem(submissionKey);
    if (savedSubmission) {
      const { submission } = JSON.parse(savedSubmission);
      this.formValues = { ...submission };
    }
  }
  private watchReferencedField(field: any) {
    // In a real app, you might use observables or a state management solution
    // For this example, we'll check periodically (you might want a better approach)
    const intervalId = setInterval(() => {
      const newValue = this.getReferencedValue(field);
      if (newValue !== this.formValues[field.id]) {
        this.formValues[field.id] = newValue;
      }
    }, 1000);
  
    // Store the interval ID so we can clean up later
    field._watchInterval = intervalId;
  }
  
  private watchTemplateFieldReferences(field: any) {
    if (!field.references) return;
  
    field.references.forEach(ref => {
      const intervalId = setInterval(() => {
        const currentRendered = this.resolveTemplate(field);
        const newRendered = this.resolveTemplate(field);
        if (newRendered !== currentRendered) {
          // Trigger change detection (simplified approach)
          this.formValues[field.id] = newRendered;
        }
      }, 1000);
  
      // Store the interval ID
      ref._watchInterval = intervalId;
    });
  }
  ngOnDestroy() {
    if (this.form) {
      this.form.sections.forEach(section => {
        section.fields.forEach(field => {
          if (field._watchInterval) {
            clearInterval(field._watchInterval);
          }
          if (field.references) {
            field.references.forEach(ref => {
              if (ref._watchInterval) {
                clearInterval(ref._watchInterval);
              }
            });
          }
        });
      });
    }
  }
  // Add this new method to set default date/time values
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
  getFieldLabel(formId, fieldId) {
    return this.formService.getFieldLabel(formId, fieldId);
  }
  getFormTitle(id) {
    return this.formService.getFormTitle(id);
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

  // Helper method to get referenced field value
  getReferencedValue(field: any): any {
    if (field.referencesField) {
      // Direct field reference
      const submissionKey = `form_submission_${field.referencesField.formId}_patient_${this.patientId}`;
      const savedSubmission = localStorage.getItem(submissionKey);
  
      if (savedSubmission) {
        const { submission } = JSON.parse(savedSubmission);
        return submission[field.referencesField.fieldId];
      }
    }
    
    return null;
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

  resolveTemplate(field: any, forValue = false): string {
    if (!field.templateString) return '';
    
    let result = field.templateString;
    
    // Replace each reference with its actual value
    if (field.references) {
      for (const ref of field.references) {
        const value = this.getReferencedValueFromTag(ref.tag);
        result = result.replace(ref.tag, value || '');
      }
    }
    
    // If we're resolving for the form value, return just the text without HTML
    if (forValue) {
      return result.replace(/<[^>]*>/g, '');
    }
    
    return result;
  }
  
  getReferencedValueFromTag(tag: string): string {
    // Extract the field name from the tag (e.g., "{{first_name}}" becomes "first_name")
    const fieldName = tag.replace(/\{\{|\}\}/g, '').replace(/_/g, ' ');
    
    // Find the referenced field in any form
    const allForms = JSON.parse(localStorage.getItem('dynamicForms')) || [];
    
    for (const form of allForms) {
      for (const section of form.sections) {
        for (const field of section.fields) {
          if (field.label === fieldName) {
            // Get the latest value for this field
            const submissionKey = `form_submission_${form.id}_patient_${this.patientId}`;
            const savedSubmission = localStorage.getItem(submissionKey);
            
            if (savedSubmission) {
              const { submission } = JSON.parse(savedSubmission);
              return submission[field.id] || '';
            }
          }
        }
      }
    }
    
    return '';
  }

  async submitForm() {
    // Prepare form data for submission
    const formData = new FormData();
  
    // Add regular fields and resolve template fields
    for (const key in this.formValues) {
      const value = this.formValues[key];
  
      if (value instanceof File) {
        // Single file
        formData.append(key, value);
      } else if (Array.isArray(value) && value[0] instanceof File) {
        // Multiple files
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}_${i}`, value[i]);
        }
      } else {
        // Regular field values
        formData.append(key, JSON.stringify(value));
      }
    }
  
    // Also include resolved template fields
    if (this.form) {
      for (const section of this.form.sections) {
        for (const field of section.fields) {
          if (field.type === 'template') {
            const resolvedValue = this.resolveTemplate(field, true);
            formData.append(field.id, resolvedValue);
          }
        }
      }
    }
  
    // Rest of your submission logic remains the same...
    formData.append('formId', this.form.id);
    formData.append('patientId', this.patientId);
  
    try {
      const submissionKey = `form_submission_${this.form.id}_patient_${this.patientId}`;
      const submissionWithoutFiles: { [key: string]: any } = {};
  
      // Include template fields in localStorage submission
      for (const key in this.formValues) {
        if (
          !(this.formValues[key] instanceof File) &&
          !Array.isArray(this.formValues[key])
        ) {
          submissionWithoutFiles[key] = this.formValues[key];
        }
      }
  
      // Add resolved template values
      if (this.form) {
        for (const section of this.form.sections) {
          for (const field of section.fields) {
            if (field.type === 'template') {
              submissionWithoutFiles[field.id] = this.resolveTemplate(field, true);
            }
          }
        }
      }
  
      localStorage.setItem(
        submissionKey,
        JSON.stringify({
          formId: this.form.id,
          patientId: this.patientId,
          submission: submissionWithoutFiles,
        })
      );
  
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  }
}
