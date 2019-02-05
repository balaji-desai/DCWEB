import { Component, OnInit } from '@angular/core';
import { loggedInUser } from "src/app/FW/LoginModel";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { NotificationService } from "src/app/notification.service";
import { api } from "src/app/FW/AppSetting";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  InstituteId: number;
  public imageUrl: String = api.imageUrl;
  constructor(private authenticationService: AuthenticationService, private tokenProvider: TokenProviderService
  ,private notificationService:NotificationService) { }
  public userDetail:loggedInUser;
    ngOnInit() {
      this.userDetail = this.tokenProvider.getUser();
      this.InstituteId = this.userDetail.InstituteId;
      this.notificationService.getNotificationSubscriber().subscribe(()=>{
        this.notificationTrigger();
      });
    }
  
    onLoggedout() {
      this.authenticationService.logout().then(function(data){
  
      });
    }

    notificationTrigger(){
      var _me = this;
      this.notificationService.CopyStudentNotifications().then(
        function(data){

        },
        function(error){

        }
      );
    }
}
