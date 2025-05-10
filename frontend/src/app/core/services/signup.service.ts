import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

   constructor(private httpClient:HttpClient) { }
  
   signup(payload:any){
      return this.httpClient.post(`${environment.API_HOST}/signup`,payload)
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
