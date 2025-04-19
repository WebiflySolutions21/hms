import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  hospitalDetails:any

  ngOnInit(){
    this.hospitalDetails = JSON.parse(localStorage.getItem("hospitalFormData"))
  }
}
