import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { loggedInUser } from "src/app/FW/LoginModel";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { api } from "src/app/FW/AppSetting";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  InstituteId: number;
  public imageUrl: String = api.imageUrl;

  constructor(private authenticationService:AuthenticationService,private tokenProvider:TokenProviderService) { }
  public userDetail:loggedInUser;
    ngOnInit() {
      this.userDetail = this.tokenProvider.getUser();
      this.InstituteId = this.userDetail.InstituteId;
    }
  
    onLoggedout() {
      this.authenticationService.logout().then(function(data){
  
      });
    }

}
