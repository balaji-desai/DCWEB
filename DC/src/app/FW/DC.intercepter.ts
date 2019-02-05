import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class DCInterceptor implements HttpInterceptor {
  constructor(private routerExtensions:Router, private tokenProvider:TokenProviderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var _me = this;
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer '+(this.tokenProvider.getUser() != null ? this.tokenProvider.getUser().AuthToken:"")
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          this.tokenProvider.setUser(null);
          _me.routerExtensions.navigate(["/"]);
        }
        else if(err.status == 500 || err.status == 0){
          _me.routerExtensions.navigate(['/error']);
        }
      }
    });
  }
}