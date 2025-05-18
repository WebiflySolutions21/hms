import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: any;
  private jwtDecodedData: any;
  constructor() {}

  setAuthenticationToken(token: any) {
    this.token = token;
  }

  getAuthenticationToken(token: any) {
    return token;
  }

  parseJWT(token: any) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
    this.jwtDecodedData = JSON.parse(window.atob(base64));
    return JSON.parse(window.atob(base64));
  }

  setJwtDecodedData(data: any) {
    this.jwtDecodedData = data;
  }
  getJwtDecodedData() {
    return this.jwtDecodedData;
  }
}
