import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MediatorService implements CanActivate {

  constructor(private router: Router, private tokenProvider:TokenProviderService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.tokenProvider.getUser() != null && this.tokenProvider.getUser().AuthToken != null)
      {    
          return true;
      }
      this.router.navigate(["/"]);
      return false;
  }
}
