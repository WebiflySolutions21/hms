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
  ngAfterViewInit() {
    // Initialize modal after view is ready
    this.modal = new (window as any).bootstrap.Modal(
      this.importModalRef.nativeElement
    );
    this.registerModal = new (window as any).bootstrap.Modal(
      this.registerModalRef.nativeElement
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
