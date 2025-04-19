import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent {
  detailsForm!: FormGroup;
  storageKey = 'hospitalFormData';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      mainTitle: ['', Validators.required],
      otherTitle: ['', Validators.required],
      address: [''],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      logo: [''],
      mainTitleColor: ['#000000'],
      otherTitleColor: ['#000000'],
      addressColor: ['#000000'],
      phoneColor: ['#000000'],
      mainTitleWeight: ['normal'],
      otherTitleWeight: ['normal'],
      addressWeight: ['normal'],
      phoneWeight: ['normal'],
      logoShape: ['original']
    });

    this.loadFromLocalStorage();

    this.detailsForm.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });
  }

  loadFromLocalStorage() {
    const savedData = localStorage.getItem(this.storageKey);
    if (savedData) {
      this.detailsForm.patchValue(JSON.parse(savedData));
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.detailsForm.value));
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.detailsForm.patchValue({ logo: reader.result as string });
        this.saveToLocalStorage();
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.detailsForm.valid) {
      console.log('Form Submitted:', this.detailsForm.value);
      alert('Form submitted successfully!');
    } else {
      this.detailsForm.markAllAsTouched();
    }
  }
}
