import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const userInfoStr = localStorage.getItem("userInfo");

    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        const token = userInfo?.token;

        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      } catch (e) {
        console.error('Invalid userInfo JSON in localStorage', e);
        // Optionally remove corrupted data
        localStorage.removeItem("userInfo");
      }
    }

    return next.handle(request);
  }
}

