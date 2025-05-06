import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
constructor(private httpClient:HttpClient) { }

  registerHospital(payload:any){
    return this.httpClient.post(`${environment.API_HOST}/hospital/create`,payload)
  }

  getHospitalList(){
    return this.httpClient.get(`${environment.API_HOST}/hospital/list`)
  }

  editHospital(payload:any){
    return this.httpClient.put(`${environment.API_HOST}/hospital/update`,payload)
  }
  
}
