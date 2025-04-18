import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {OPTHAL_ROUTES} from "@assets/constants/opthal.constants"
@Component({
  selector: 'app-opthal',
  templateUrl: './opthal.component.html',
  styleUrls: ['./opthal.component.scss']
})
export class OpthalComponent {
  opthalRoutes=OPTHAL_ROUTES
  hospitalName=''
  constructor(private router:Router){}
  
  navigateUser(data) {
    this.router.navigate([`/main/opthal/${data?.path}`])

    console.log(data);
  }
}
