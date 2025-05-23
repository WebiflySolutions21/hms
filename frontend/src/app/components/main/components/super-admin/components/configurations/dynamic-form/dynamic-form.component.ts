// dynamic-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormConfig } from '@assets/constants/form.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig = {
    id: '1',
    title: 'New Form',
    description: 'This is a new form',  // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    sections: [],
  };
  
  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createFormControls();
  }

  // onFileChange(event: any, field: FormFieldConfig) {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     // Validate file size if specified
  //     if (field.maxSize) {
  //       const maxBytes = field.maxSize * 1024 * 1024;
  //       for (let file of files) {
  //         if (file.size > maxBytes) {
  //           alert(`File ${file.name} exceeds maximum size of ${field.maxSize}MB`);
  //           event.target.value = ''; // Clear selection
  //           return;
  //         }
  //       }
  //     }
      
  //     // Store files in form data
  //     this.formData[field.id] = field.multiple ? files : files[0];
  //   }
  // }
  // In your component class
hasError(fieldId: string, errorType: string): boolean {
  const control = this.formGroup.get(fieldId);
  return control ? control.hasError(errorType) : false;
}

createFormControls() {
  this.config.sections.forEach(section => {
    section.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'number') {
        if (field.min !== null && field.min !== undefined) {
          validators.push(Validators.min(field.min));
        }
        if (field.max !== null && field.max !== undefined) {
          validators.push(Validators.max(field.max));
        }
      }

      // Determine default value based on field type
      let defaultValue: any = this.getDefaultValue(field);

      this.formGroup.addControl(
        field.id,
        new FormControl(defaultValue, validators)
      );
    });
  });
}

// Add this new method to get default values
private getDefaultValue(field: any): any {
  // If there's an explicit default value, use that
  if (field.defaultValue !== undefined && field.defaultValue !== null) {
    return field.defaultValue;
  }

  // Set default values for date/time fields
  const now = new Date();
  
  switch (field.type) {
    case 'date':
      return now.toISOString().split('T')[0]; // YYYY-MM-DD
      
    case 'time':
      return now.toTimeString().substring(0, 5); // HH:MM
      
    case 'datetime-local':
      const datePart = now.toISOString().split('T')[0];
      const timePart = now.toTimeString().substring(0, 5);
      return `${datePart}T${timePart}`; // YYYY-MM-DDTHH:MM
      
    case 'checkbox':
      return false;
      
    case 'multi-checkbox':
      return [];
      
    case 'number':
      return null;
      
    default:
      return '';
  }
}
  
onMultiCheckboxChange(fieldId: string, value: any, checked: boolean): void {
  const control = this.formGroup.get(fieldId);
  if (!control) return;

  const current = control.value || [];
  if (checked) {
    control.setValue([...current, value]);
  } else {
    control.setValue(current.filter((v: any) => v !== value));
  }

  control.markAsTouched();
}


getErrorMessages(fieldId: string): string[] {
  const control = this.formGroup.get(fieldId);
  if (!control || !control.errors || !control.touched) return [];
  
  return Object.keys(control.errors).map(key => {
    const error = control.errors?.[key];
    switch(key) {
      case 'required': return 'This field is required';
      case 'min': return `Minimum value is ${error.min}`;
      case 'max': return `Maximum value is ${error.max}`;
      case 'minlength': return `Minimum length is ${error.requiredLength}`;
      case 'maxlength': return `Maximum length is ${error.requiredLength}`;
      case 'pattern': return 'Invalid format';
      default: return 'Invalid value';
    }
  });
}
}