// form-builder.component.ts
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  FormConfig,
  FormFieldConfig,
  FormSection,
} from '@assets/constants/form.model';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/services';
import {
  SUPER_ADMIN_LOGIN_TYPES,
  SUPER_ADMIN_TABLE_DATA,
} from '@assets/constants/super-admin.constants';
import { FORM_BUILDER_AVAILABLE_TYPES } from '@assets/constants/form-builder.constants';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  logInCategoryTypes: any;
  @ViewChild('registerModal') registerModalRef!: ElementRef;
  registerModal: any;
  enableRegister = false;
  registerButtonText = 'View Register';
  showRegisterPrompt = false;
  hospitalList = SUPER_ADMIN_TABLE_DATA.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    value: hospital.name.toLowerCase().replace(/[^a-z]/g, '') + 'Hospital',
  }));

  loginTypes = SUPER_ADMIN_LOGIN_TYPES;
  dropdowns = [
    {
      heading: 'Hospital List',
      key: 'hospitaList',
      options: this.hospitalList,
      dropdownId: 1,
      initialSelections: [],
    },
    {
      heading: 'Login Types',
      key: 'loginTypes',
      options: this.loginTypes,
      dropdownId: 2,
      initialSelections: [],
    },
  ];

  formConfig: any;
  @ViewChild('importModal') importModalRef!: ElementRef;
  availableFieldTypes = FORM_BUILDER_AVAILABLE_TYPES;
  isEditMode = false;
  availableForms: FormConfig[] = [];
  modal: any;
  selectedCheckboxes = [];
  // Add these properties to your component
  isExistingForm = false;
  originalFormId: string | null = null;
  @ViewChild('referenceModal') referenceModalRef!: ElementRef;
  referenceModal: any;
  selectedReferenceFormId: string = '';
  selectedReferenceFieldId: string = '';
  currentFieldForReference: any | null = null;
  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  // Add to FormBuilderComponent
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const formId = params['id'];
      if (formId) {
        this.loadForm(formId);
      } else {
        this.initializeForm();
      }
    });
  }

  // Add to FormBuilderComponent class

  // Method to check if a field is a reference
  isReferenceField(field: FormFieldConfig): boolean {
    return !!field.referencesField;
  }

  // Method to get all forms that can be referenced
  getReferenceableForms(): FormConfig[] {
    console.log();
    let data2 = this.formService.getAllForms();
    console.log('data2', data2);

    let data = this.formService
      .getAllForms()
      .filter((form) => form.id !== this.formConfig.id);
    console.log('data', data);
    return data;
  }

  // Method to get all fields from a specific form that can be referenced
  getReferenceableFields(formId: string): FormFieldConfig[] {
    const form = this.formService.getFormById(formId);
    if (!form) return [];

    // Filter out fields that are themselves references to avoid circular references
    return form.sections.flatMap((section) =>
      section.fields.filter((field) => !field.isReference)
    );
  }

  // Add these new methods
showReferencePicker(field: FormFieldConfig) {
  this.currentFieldForReference = field;
  this.selectedReferenceFormId = '';
  this.selectedReferenceFieldId = '';
  this.referenceModal.show();
}

insertReference() {
  if (!this.currentFieldForReference || !this.selectedReferenceFieldId) return;

  const referencedField = this.getReferencedField(
    this.selectedReferenceFormId,
    this.selectedReferenceFieldId
  );

  if (referencedField) {
    const referenceTag = `{{${referencedField.label.replace(/\s+/g, '_')}}}`;
    
    if (!this.currentFieldForReference.templateString) {
      this.currentFieldForReference.templateString = '';
    }
    
    this.currentFieldForReference.templateString += referenceTag;
    
    // Store the reference relationship
    if (!this.currentFieldForReference.references) {
      this.currentFieldForReference.references = [];
    }
    
    this.currentFieldForReference.references.push({
      formId: this.selectedReferenceFormId,
      fieldId: this.selectedReferenceFieldId,
      tag: referenceTag
    });
  }

  this.referenceModal.hide();
}

getReferencedField(formId: string, fieldId: string): FormFieldConfig | null {
  const form = this.formService.getFormById(formId);
  if (!form) return null;

  for (const section of form.sections) {
    const field = section.fields.find(f => f.id === fieldId);
    if (field) return field;
  }
  return null;
}

previewTemplate(templateString: string): string {
  if (!templateString) return '';
  
  // This is a simple preview - in a real implementation, you'd want to 
  // actually replace the references with values from the referenced forms
  return templateString.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
    return `[${p1.replace(/_/g, ' ')}]`;
  });
}
resolveTemplate(field: any): string {
  if (!field.templateString) return '';
  
  let result = field.templateString;
  
  // Replace each reference with its actual value
  if (field.references) {
    for (const ref of field.references) {
      const value = this.getReferencedValue(ref.formId, ref.fieldId);
      result = result.replace(ref.tag, value);
    }
  }
  
  return result;
}
getReferencedValue(formId: string, fieldId: string): string {
  // Implement logic to get the actual value from the referenced form/field
  // This might involve looking up form data from a service
  return '[Resolved Value]'; // Placeholder
}
  // Method to update a field to reference another field
  setFieldReference(field: FormFieldConfig, formId: string, fieldId: string) {
    field.referencesField = { formId, fieldId };
    field.isReference = true;

    // Optionally copy some properties from the referenced field
    const referencedForm = this.formService.getFormById(formId);
    if (referencedForm) {
      const referencedField = referencedForm.sections
        .flatMap((s) => s.fields)
        .find((f) => f.id === fieldId);

      if (referencedField) {
        field.label = `[Ref] ${referencedField.label}`;
        field.type = referencedField.type;
      }
    }
  }

  // Method to clear a field reference
  clearFieldReference(field: FormFieldConfig) {
    field.referencesField = undefined;
    field.isReference = false;
    field.label = field.label.replace('[Ref] ', '');
  }

  ngAfterViewInit() {
    // Initialize modal after view is ready
    this.modal = new (window as any).bootstrap.Modal(
      this.importModalRef.nativeElement
    );
    this.registerModal = new (window as any).bootstrap.Modal(
      this.registerModalRef.nativeElement
    );
    this.referenceModal = new (window as any).bootstrap.Modal(
      this.referenceModalRef.nativeElement
    );
  }
  addOption(field: FormFieldConfig) {
    if (!field.options) field.options = [];
    field.options.push({ value: '', label: '' });
  }

  openImportModal() {
    this.availableForms = this.formService.getAllForms();
    this.modal.show();
  }
  // Update your importForm method
  importForm(form: any) {
    // First reset the form
    this.initializeForm();

    // Then load the imported form data
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.originalFormId = form.id;
    this.isExistingForm = this.formService.formExists(form.id);
    this.isEditMode = true;
    this.modal.hide();

    // Process formVisibility to set initial selections
    if (form.formVisibility) {
      this.processFormVisibility(form.formVisibility);
    }
  }

  private processFormVisibility(formVisibility: any[]) {
    this.selectedCheckboxes = [...formVisibility];

    this.dropdowns.forEach((dropdown) => {
      // Find matching visibility item
      const visibilityItem = formVisibility.find((item) =>
        Object.keys(item).includes(dropdown.key)
      );

      if (visibilityItem) {
        // Map the visibility data to initial selections format
        dropdown.initialSelections = visibilityItem[dropdown.key].map(
          (item: any) => ({
            name: item.name,
            value: item.id?.toString() || item.value || '',
            dropdownId: dropdown.dropdownId,
            key: dropdown.key,
          })
        );
      } else {
        dropdown.initialSelections = [];
      }
    });

    // Force change detection to update the dropdowns
    this.cdr.detectChanges();
  }

  // Add this new method to process formVisibility into initial selections
  setInitialSelectionsFromFormVisibility(formVisibility: any[]) {
    if (!formVisibility || !formVisibility.length) return;

    formVisibility.forEach((visibilityItem) => {
      const key = Object.keys(visibilityItem).find((k) => k !== 'isPrintable');
      if (key) {
        const dropdownConfig = this.dropdowns.find((d) => d.key === key);
        if (dropdownConfig) {
          // Map the visibility data to match the dropdown options format
          const initialSelections = visibilityItem[key].map((item: any) => ({
            name: item.name,
            value: item.id.toString(),
            dropdownId: dropdownConfig.dropdownId,
            key: key,
          }));
          console.log('initialSelections', initialSelections);
          // Set initialSelections for the dropdown
          dropdownConfig.initialSelections = initialSelections;
        }
      }
    });
    console.log(this.dropdowns);
  }

  onSelectionChanged(selectedOptions) {
    if (selectedOptions.length) {
      selectedOptions.forEach((option) => {
        // Check if the label already exists in selectedCheckboxes
        console.log('selectedCheckboxes', this.selectedCheckboxes);
        console.log('selectedOptions', selectedOptions);
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

  // Add these new methods

  handleRegisterSetup() {
    // Show the register configuration modal
    return new Promise<void>((resolve) => {
      this.registerModal.show();

      // Listen for when the modal is hidden
      this.registerModalRef.nativeElement.addEventListener(
        'hidden.bs.modal',
        () => {
          resolve();
        },
        { once: true }
      );
    });
  }

  confirmRegister() {
    if (this.enableRegister) {
      this.formService.saveRegister(this.formConfig.id, {
        buttonText: this.registerButtonText,
        createdAt: new Date(),
        entries: [],
      });
    }

    this.registerModal.hide();
    this.showRegisterPrompt = false;
    alert('New form created successfully!');
  }

  countFields(form: FormConfig): number {
    return form.sections.reduce(
      (total, section) => total + section.fields.length,
      0
    );
  }

  // Modify your initializeForm method
  initializeForm() {
    this.formConfig = {
      id: this.formService.generateId(),
      title: 'New Form',
      sections: [],
      description: 'This is a new form',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    this.isExistingForm = false;
    this.originalFormId = null;
    this.isEditMode = false;
  }

  importAsCopy(form: any) {
    // Create a new copy with new ID
    this.formConfig = this.formService.cloneForm(form);
    this.isExistingForm = false;
    this.originalFormId = null;
    this.isEditMode = true;
    this.modal.hide();

    // Process formVisibility to set initial selections
    if (form.formVisibility) {
      this.processFormVisibility(form.formVisibility);
    }
  }

  importForUpdate(form: any) {
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.isExistingForm = true;
    this.originalFormId = form.id;
    this.isEditMode = true;
    this.modal.hide();

    // Process formVisibility to set initial selections
    if (form.formVisibility) {
      this.processFormVisibility(form.formVisibility);
    }
  }

  // Update your loadForm method
  loadForm(id: string) {
    const form = this.formService.getFormById(id);
    if (form) {
      this.formConfig = form;
      this.originalFormId = form.id;
      this.isExistingForm = true;
      this.isEditMode = true;
    }
  }

  addSection() {
    this.formConfig.sections.push({
      id: `section-${Date.now()}`,
      title: 'New Section',
      columns: 1,
      fields: [],
    });
  }

  // form-builder.component.ts
  addField(section: FormSection) {
    const defaults: any = {
      text: { placeholder: 'Enter text...' },
      number: { placeholder: 'Enter number...', min: null, max: null, step: 1 },
      date: { placeholder: 'Select date...', minDate: null, maxDate: null },
      time: { placeholder: 'Select time...', minTime: null, maxTime: null },
      'datetime-local': { placeholder: 'Pick date & time...' },
      checkbox: { defaultValue: false },
      select: { options: [{ value: '', label: '' }] },
      radio: { options: [{ value: '', label: '' }] },
      'multi-checkbox': {
        options: [{ value: '', label: '' }],
        file: {
          accept: '*',
          multiple: false,
          maxSize: 5, // MB
        },
      },
    };

    const newField: FormFieldConfig = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
      referencesField: {
        formId: '',
        fieldId: '',
      },
      isReference: false,
      span: 1,
      ...defaults['text'],
    };

    section.fields.push(newField);
  }

  removeSection(index: number) {
    this.formConfig.sections.splice(index, 1);
  }

  removeField(section: FormSection, index: number) {
    section.fields.splice(index, 1);
  }

  onSectionDrop(event: CdkDragDrop<FormSection[]>) {
    moveItemInArray(
      this.formConfig.sections,
      event.previousIndex,
      event.currentIndex
    );
  }

  onFieldDrop(event: CdkDragDrop<FormFieldConfig[]>, section: FormSection) {
    if (event.previousContainer === event.container) {
      moveItemInArray(section.fields, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getSafeReferencesField(field: FormFieldConfig) {
    if (!field.referencesField) {
      field.referencesField = { formId: '', fieldId: ''};
    }
    console.log(field)
    return field.referencesField;
  }
// Handle form selection change
onFormSelectChange(field: any) {
  // Clear fieldId when form changes 
  if (field.referencesField) {
    field.referencesField.fieldId = '';

  }
  // Trigger change detection
  this.cdr.detectChanges();
}

  getFieldLabel(formId, fieldId) {
    return this.formService.getFieldLabel(formId, fieldId);
  }
  getFormTitle(id) {
    return this.formService.getFormTitle(id);
  }

  removeOption(field: FormFieldConfig, index: number) {
    field.options?.splice(index, 1);
  }

  saveForm() {
    if (this.isExistingForm) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  createForm() {
    this.formConfig.id = this.formService.generateId();
    this.formConfig.createdAt = new Date();
    this.formConfig.version = 1;

    let payload = {
      ...this.formConfig,
      formVisibility: this.selectedCheckboxes,
    };
    console.log(payload);
    this.formService.saveForm(payload);

    // Always show register prompt for new forms
    this.handleRegisterSetup();

    this.initializeForm();
  }

  updateForm() {
    if (!this.originalFormId) return;

    this.formConfig.id = this.originalFormId;
    let payload = {
      ...this.formConfig,
      formVisibility: this.selectedCheckboxes,
    };
    this.formService.saveForm(payload);

    if (
      !this.formService.formHasRegister(this.originalFormId) ||
      this.showRegisterPrompt
    ) {
      this.handleRegisterSetup();
    }

    alert('Form updated successfully!');
  }
}
