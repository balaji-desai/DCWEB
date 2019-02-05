import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { Router } from "@angular/router";
import { loggedInUser } from "src/app/FW/LoginModel";
import { showLineError } from "src/app/FW/error";
import { encrypt } from "src/app/FW/commonfunctions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  private logedindata:loggedInUser;
  public _lmsg:any;
  public loading:boolean=false;

  constructor(private authenticationService:AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  public onLoggedin(loginform) {
    console.log("login");
    this._lmsg = {};
    if (loginform.invalid) {
      this._lmsg = showLineError(loginform);
      return;
    }
    var _me = this;
    _me.loading = true;
    var obj = encrypt(this.password);
    this.authenticationService.loginUser(this.username, obj.token,obj.val).then(function(data)
  {
    _me.logedindata = data;
    _me.loading = false;
    var users = _me.logedindata.UserType.split(",");
    if(users.length > 1)
      {
        _me.router.navigate(["apps"]);
      }
      else if(users[0].toLowerCase() == "admin"){
          _me.router.navigate(["/admin"]);
        }
        else if(users[0].toLowerCase() == "student"){
          _me.router.navigate(["/student"]);
        }else if(users[0].toLowerCase() == "teacher" || users[0].toLowerCase() == "hod"){
          _me.router.navigate(["/faculty"]);
        }else if(users[0].toLowerCase() == "exam section" || users[0].toLowerCase() == "accountant")
        {
          _me.router.navigate(["/staff"]);
        }
  },
function(error){
  _me.loading = false;
_me._lmsg["invaliduser"] = "Invalid Username/Password.";
});
}

}
