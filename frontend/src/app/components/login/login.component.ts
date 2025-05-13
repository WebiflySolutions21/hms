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
    // this.router.navigate(['/auth/signup']);
    //redirect to signup page
  }

  loginUser() {
    console.log(this.loginForm.value);
    // if(this.userId !="shift"){
    //   this.router.navigate([`/main/${this.userId}/${this.userId}-dashboard`])
    // } else{
    //   this.router.navigate([`/main/${this.userId}-admin`])

    // }
    // return
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
            console.log('decoded JWT', jwtDecode);

            // if(jwtDecode && jwtDecode.role.length > 0){
            //   this.router.navigate([`/main/${jwtDecode.role[0]}/${jwtDecode.role[0]}-dashboard`]);
            //   this.router.navigate([`/main/${jwtDecode.role[0]}/${jwtDecode.role[0]}-dashboard`]);

            // }else{
            //   this.router.navigate(['/patient-dashboard']);
            // }
            this.authenticationService.setAuthenticationToken(res['token']);
            this.userService.setUserInfo({
              token: res['token'],
              info: this.authenticationService.parseJWT(res['token']),
            });
          }
          this.toastrService.success('You Logged In Successfully', 'Success');
          this.router.navigate([
            `/main/${this.userId}/${this.userId}-dashboard`,
          ]);
          this.loaderService.hide();
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
