import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(payload:any){
    return this.httpClient.post(`${environment.API_HOST}/login`,payload)
  }
  decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
}
