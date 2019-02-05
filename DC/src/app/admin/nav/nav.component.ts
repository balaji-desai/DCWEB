import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { api } from "src/app/FW/AppSetting";
import { TokenProviderService } from "src/app/FW/token-provider.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  InstituteId: number;
  public imageUrl: String = api.imageUrl;
  constructor(private authenticationService:AuthenticationService,
    private tokenProviderService:TokenProviderService) { }

  ngOnInit() {
    this.InstituteId = this.tokenProviderService.getUser().InstituteId;
  }

  onLoggedout() {
    this.authenticationService.logout().then(function(data){

    })
}
}
