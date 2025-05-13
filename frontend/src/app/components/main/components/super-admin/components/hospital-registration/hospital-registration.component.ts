import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService, LoaderService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss'],
})
export class HospitalRegistrationComponent {
  registrationForm: FormGroup;

  formFields = [
    // {
    //   label: 'Registration Date',
    //   name: 'regDate',
    //   type: 'date',
    //   validators: Validators.required,
    // },
    {
      label: 'Hospital Name',
      name: 'name',
      type: 'text',
      validators: Validators.required,
    },
    {
      label: 'Mobile Number',
      name: 'mobile',
      type: 'text',
      validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
    },
    {
      label: 'Hospital Registration Number',
      name: 'registration_no',
      type: 'text',
      validators: Validators.required,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'textarea',
      validators: Validators.required,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private toastrService: ToastrService,
    public loader:LoaderService,
    private router: Router
  ) {
    const formGroupConfig = {};
    this.formFields.forEach((field) => {
      formGroupConfig[field.name] = ['', field.validators];
    });
    this.registrationForm = this.fb.group(formGroupConfig);
  }

  submit() {
    this.loader.show()
    console.log("inside submit")
    let payload = { ...this.registrationForm.value };
    this.hospitalService.registerHospital(payload).subscribe(
      (res) => {
        this.toastrService.success('Hospital Registered Successfully', 'Success');
        this.router.navigate(['main/super-admin/super-admin-dashboard']);
        this.loader.hide()
      },
      (err) => {
        this.toastrService.error('Error In Hospital Registration', err?.error?.errorMessage);
        this.loader.hide()

      }
    );
  }
}
