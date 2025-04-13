import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hospital-config-details',
  templateUrl: './hospital-config-details.component.html',
  styleUrls: ['./hospital-config-details.component.scss'],
})
export class HospitalConfigDetailsComponent implements OnInit {
  hospitalId: number;
  hospitalName: string;

  forms: any[] = [];
  filteredForms: any[] = [];
  selectedForm: any = null;
  displayedColumns: string[] = ['srNo', 'title', 'status', 'actions'];
  isLoading = true;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.hospitalId = +params['id'];
      this.hospitalName = decodeURIComponent(params['name']);

      if (this.hospitalId && this.hospitalName) {
        this.loadForms();
      } else {
        // Handle invalid/missing params
        this.location.back();
      }
    });
  }

  loadForms() {
    this.isLoading = true;
    try {
      this.forms = this.formService.getAllForms();
      this.filterFormsForHospital();
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      this.isLoading = false;
    }
  }

  filterFormsForHospital() {
    this.filteredForms = this.forms
      .filter((form) => form.formVisibility) // Only show forms with visibility config
      .map((form, index) => ({
        srNo: index + 1,
        ...form,
        isActive: this.isFormConfiguredForHospital(form),
        lastUpdated: this.getFormLastUpdated(form),
      }));
  }

  getFormLastUpdated(form: any): string {
    return form.updatedAt
      ? new Date(form.updatedAt).toLocaleDateString()
      : 'Not available';
  }

  isFormConfiguredForHospital(form: any): boolean {
    return form.formVisibility.some((visibility: any) =>
      visibility.hospitaList?.some(
        (hospital: any) => hospital.id === this.hospitalId
      )
    );
  }

  toggleFormVisibility(form: any) {

    if (form.isActive) {
      this.addHospitalToFormVisibility(form);
    } else {
      this.removeHospitalFromFormVisibility(form);
    }

    form.updatedAt = new Date().toISOString();
    this.formService.saveForm(form);
    this.filterFormsForHospital();
  }

  addHospitalToFormVisibility(form: any) {
    let hospitalVisibility = form.formVisibility.find(
      (v: any) => v.hospitaList
    );

    if (!hospitalVisibility) {
      hospitalVisibility = { hospitaList: [], isPrintable: true };
      form.formVisibility.push(hospitalVisibility);
    }

    if (
      !hospitalVisibility.hospitaList.some((h: any) => h.id === this.hospitalId)
    ) {
      hospitalVisibility.hospitaList.push({
        id: this.hospitalId,
        name: this.hospitalName,
      });
    }
  }

  removeHospitalFromFormVisibility(form: any) {
    form.formVisibility.forEach((visibility: any) => {
      if (visibility.hospitaList) {
        visibility.hospitaList = visibility.hospitaList.filter(
          (hospital: any) => hospital.id !== this.hospitalId
        );
      }
    });

    // Clean up empty visibility items
    form.formVisibility = form.formVisibility.filter(
      (visibility: any) =>
        visibility.hospitaList?.length > 0 || visibility.loginTypes?.length > 0
    );
  }

  showFormDetails(form: any) {
    this.selectedForm = form;
  }

  closeFormDetails() {
    this.selectedForm = null;
  }

  goBack() {
    this.location.back();
  }
}
