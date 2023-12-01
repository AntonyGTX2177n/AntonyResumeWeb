import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { UserAccessService } from './user-access.service';


@Injectable()
export class UserAccessInterceptor implements HttpInterceptor {

  constructor(private authService: UserAccessService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler){
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
