import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SIGNUP_FIELDS } from '@assets/constants/login-fields.constants';
import { ToastrService } from 'ngx-toastr';
import {
  AuthenticationService,
  LoaderService,
  SignupService,
  UserService,
} from 'src/app/core/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  fields = SIGNUP_FIELDS;
  loginForm: any;
  userId: string | null = '';

  constructor(
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    public loader: LoaderService
  ) {
    this.loginForm = FormGroup;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe((params) => {
      this.userId = params.get('userId');
      console.log(this.userId);
    });
  }

  redirectToRegistration() {
    this.router.navigate(['/main/agent']);
  }

  login() {
    this.router.navigate(['/login']);
    //redirect to signup page
  }

  signupUser() {
    // console.log(this.loginForm.value);
    // if(this.userId !="shift"){
    //   this.router.navigate([`/main/${this.userId}/${this.userId}-dashboard`])
    // } else{
    //   this.router.navigate([`/main/${this.userId}-admin`])

    // }
    // return
    this.loader.show();
    let payload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
      name: this.loginForm.controls.name.value,
    };
    this.signupService.signup(payload).subscribe(
      (res: any) => {
        if (res && res?.success) {
          if (res['token']) {
            let jwtDecode = this.signupService.decodeJWT(res['token']);
            console.log('decoded JWT', jwtDecode);

            if (jwtDecode && jwtDecode.role.length > 0) {
              this.router.navigate([
                `/main/${jwtDecode.role[0]}/${jwtDecode.role[0]}-dashboard`,
              ]);
            } else {
              this.router.navigate(['/patient-dashboard']);
            }

            this.authenticationService.setAuthenticationToken(res['token']);
            this.userService.setUserInfo({
              token: res['token'],
              info: this.authenticationService.parseJWT(res['token']),
            });
          }
          this.toastrService.success('You Logged In Successfully', 'Success');
          this.loader.hide();
          // this.router.navigate(['/main/agent']);
        }
        console.log(res);
      },
      (err) => {
        this.toastrService.error('Error In Signup', err.error.errorMessage);
        this.loader.hide();
      }
    );
  }
}
