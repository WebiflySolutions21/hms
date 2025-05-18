import { Component, OnInit } from '@angular/core';
import { LOGIN_FIELDS } from 'src/assets/constants/login-fields.constants';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticationService,
  LoaderService,
  LoginService,
  UserService,
} from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fields = LOGIN_FIELDS;
  loginForm: any;
  userId: string | null = '';
  roleIconMap: { [key: string]: string } = {
    admin: 'fas fa-user-shield',
    'super-admin': 'fas fa-crown',
    staff: 'fas fa-users',
    reception: 'fas fa-concierge-bell',
    doctor: 'fas fa-user-md',
    lab: 'fas fa-vials',
    medical: 'fas fa-pills',
  };

  roleOptions: any;

  showLoginOptions: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    public loaderService: LoaderService
  ) {
    this.loginForm = FormGroup;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe((params) => {
      this.userId = params.get('userId');
      console.log(this.userId);
    });
  }

  redirectToRegistration() {
    this.router.navigate(['/main/agent']);
  }

  signup() {
    this.router.navigate(['/signup']);
    //redirect to signup page
  }

  selectLoginRole(role: string) {
    localStorage.setItem('selectedRole', role);
    this.router.navigate([`/main/${role}/${role}-dashboard`]);
  }

  loginUser() {
    this.loaderService.show();
    let payload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    this.loginService.login(payload).subscribe(
      (res: any) => {
        if (res && res?.success) {
          if (res['token']) {
            let jwtDecode = this.loginService.decodeJWT(res['token']);
            this.authenticationService.setJwtDecodedData(jwtDecode);
            this.roleOptions = jwtDecode.role.map((role: string) => ({
              name: role,
              icon: this.roleIconMap[role] || 'fas fa-user', // fallback icon
            }));

            this.authenticationService.setAuthenticationToken(res['token']);
            this.userService.setUserInfo({
              token: res['token'],
              info: this.authenticationService.parseJWT(res['token']),
            });

            if (
              jwtDecode &&
              jwtDecode.role.length &&
              jwtDecode.role.length == 1
            ) {
              this.router.navigate([
                `/main/${jwtDecode.role[0]}/${jwtDecode.role[0]}-dashboard`,
              ]);
            } else if (
              jwtDecode &&
              jwtDecode.role.length &&
              jwtDecode.role.length > 1
            ) {
              this.roleOptions = jwtDecode.role.map((role: string) => ({
                name: role,
                icon: this.roleIconMap[role] || 'fas fa-user',
              }));
              this.showLoginOptions = true;
            } else {
              this.router.navigate(['main/patient/patient-dashboard']);
            }
            this.toastrService.success('You Logged In Successfully', 'Success');
            this.loaderService.hide();
          }
        }
        console.log(res);
      },
      (err) => {
        this.toastrService.error('Error In login', err?.error?.errorMessage);
        this.loaderService.hide();
      }
    );
  }
}
