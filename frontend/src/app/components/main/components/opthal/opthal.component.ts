import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {OPTHAL_ROUTES} from "@assets/constants/opthal.constants"
import { EventEmitterService } from 'src/app/core/services';
@Component({
  selector: 'app-opthal',
  templateUrl: './opthal.component.html',
  styleUrls: ['./opthal.component.scss']
})
export class OpthalComponent {
  opthalRoutes=OPTHAL_ROUTES
  hospitalName=''
  constructor(private router:Router,private eventEmitterService:EventEmitterService){}
  
  navigateUser(data) {
    if(data.path==="/template-dashboard"){
      this.eventEmitterService.emit("open-template-modal-opthal")
    }else{
      this.router.navigate([`/main/opthal/${data?.path}`])

    }

    console.log(data);
  }
}
