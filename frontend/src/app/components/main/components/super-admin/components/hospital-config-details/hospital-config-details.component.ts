import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LOGIN_TYPE_LANDING_PAGE } from '@assets/constants/app.constants';
import { SUPER_ADMIN_LOGIN_TYPES } from '@assets/constants/super-admin.constants';
import { HospitalService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-config-details',
  templateUrl: './hospital-config-details.component.html',
  styleUrls: ['./hospital-config-details.component.scss'],
})
export class HospitalConfigDetailsComponent implements OnInit {
  hospitalId: number;
  hospitalName: string;
  selectedCheckboxes: any = [];
  formDetails: any;
  forms: any[] = [];
  filteredForms: any[] = [];
  selectedForm: any = null;
  displayedColumns: string[] = ['srNo', 'title', 'status', 'actions'];
  isLoading = true;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  loginTypes = SUPER_ADMIN_LOGIN_TYPES;
  initialSelections:any;
  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private location: Location,
    private hospitalService: HospitalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.dropdownList = LOGIN_TYPE_LANDING_PAGE;
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true,
    };
    this.route.queryParams.subscribe((params) => {
      this.hospitalId = +params['id'];
      this.hospitalName = decodeURIComponent(params['name']);
    });
    this.getAllFormsData();
  }

  getAllFormsData() {
    this.formService.getForms(this.hospitalId).subscribe(
      (res: any) => {
        if (res && res.success) {
          this.formService.setAllFormsData(res.forms);
          this.loadForms();
        }
      },
      (err) => {
        console.error('Error fetching forms:', err);
      }
    );
  }

  loadForms() {
    this.isLoading = true;
    try {
      this.forms = this.formService.getAllForms();
      console.log('Forms:', this.forms);
    } catch (error) {
      console.error('Error loading forms:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getFormLastUpdated(form: any): string {
    return form.updatedAt
      ? new Date(form?.json?.updatedAt).toLocaleDateString()
      : 'Not available';
  }

  updateStatus(message?) {
    let payload = {
      form_id: this.formDetails.id,
      hospital_id: this.hospitalId,
      status: this.formDetails.status,
      visibility: this.selectedCheckboxes[0].loginTypes || [],
    };

    this.hospitalService.updateFormsStatus(payload).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          this.toastrService.success(
            message ? message : 'Visibility Updated Successfully',
            'Success'
          );
          this.getAllFormsData();
        }
      },
      error: (err: any) => {
        this.toastrService.error(
          'Failed to update status',
          err.error.errorMessage
        );
      },
    });
  }

  visibiliClicked(form: any) {
    this.formDetails = form;
    console.log(JSON.parse(form.visibility));
    this.loginTypes = JSON.parse(form.visibility);
  }

  toggleFormVisibility(form: any, event: any) {
    this.formDetails = form;
    this.formDetails.status = event ? 'active' : 'inactive';
    this.updateStatus(
      event ? 'Form Activated Successfully' : 'Form Deactivated Successfully'
    );
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

    console.log(form);
  }

  closeFormDetails() {
    this.selectedForm = null;
  }

  goBack() {
    this.location.back();
  }

  onSelectionChanged(selectedOptions) {
    if (selectedOptions.length) {
      selectedOptions.forEach((option) => {
        let existingLabelIndex = this.selectedCheckboxes.findIndex(
          (item) => Object.keys(item)[0] === option.key
        );
        console.log(option);
        // Prepare a dynamic list of options without duplicates
        const dynamicOptions = option.options.map((opt) => opt.value);

        if (existingLabelIndex !== -1) {
          // Replace existing data with the new data
          this.selectedCheckboxes[existingLabelIndex] = {
            [option.key]: dynamicOptions,
          };
        } else {
          // Create a new label object with the dynamic options
          let newOption = {
            [option.key]: dynamicOptions,
          };
          this.selectedCheckboxes.push(newOption);
        }
      });

      console.log(this.selectedCheckboxes);
    }
  }
}
