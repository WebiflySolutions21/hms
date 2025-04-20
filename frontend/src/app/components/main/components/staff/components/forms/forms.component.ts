import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  forms: any[] = [];
  loginType = 'Staff';
  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('dynamicForms');
    if (stored){
       this.forms = JSON.parse(stored)
      console.log(this.forms)};
  }

  shouldShowButton(form: any): boolean {
    if (!form.formVisibility || form.formVisibility.length === 0) {
      return true;
    }
  
    return form.formVisibility.some((visibility: any) => 
      visibility.loginTypes?.some((loginType: any) => loginType.name === this.loginType)
    );
  }

  openForm(formId: string) {
    this.router.navigate(['/main/staff/forms/view', formId]);
  }
  
}
