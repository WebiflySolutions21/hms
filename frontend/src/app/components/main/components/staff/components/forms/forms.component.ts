import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/core/services';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  forms: any[] = [];
  loginType = 'Staff';
  constructor(private router: Router, private formService: FormService) {}

  ngOnInit() {
    // const stored = localStorage.getItem('dynamicForms');
    // console.log('Stored Forms:', stored);
    // if (stored) {
    //   this.forms = JSON.parse(stored);
    //   console.log(this.forms);
    // }

    this.getAllForms();
  }

  getAllForms() {
    this.formService.getForms().subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        this.forms = res.forms
        this.formService.setAllFormsData(this.forms);
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }

  shouldShowButton(form: any): boolean {
    if (!form.formVisibility || form.formVisibility.length === 0) {
      return true;
    }

    return form.formVisibility.some((visibility: any) =>
      visibility.loginTypes?.some(
        (loginType: any) => loginType.name === this.loginType
      )
    );
  }

  openForm(formId: string) {
    this.router.navigate(['/main/staff/forms/view', formId]);
  }
}
