import { Injectable } from '@angular/core';
import { api } from "src/app/FW/AppSetting";
import { HttpClient } from "@angular/common/http";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { HttpHeaders } from "@angular/common/http";
import { loggedInUser } from "src/app/FW/LoginModel";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public apiUrl = api;
  constructor(private http: HttpClient, private tokenprovider: TokenProviderService) {

   }

   public loginUser(username, password, val): Promise<any> {
    var _me = this;
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('val', val);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  
    let promise = new Promise((resolve, reject) => {
      this.http.post<loggedInUser>(api.accountUrl +'login?',body.toString(), options//encodeURI('username=' + username + '&password=' + password), null
      ).toPromise().then(
        function (resp) {
          _me.tokenprovider.setUser(resp);
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
  }
  
  public logout(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.accountUrl +'logout'
      ).toPromise().then(
        function (resp) {
          _me.tokenprovider.setUser(null);
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
  }
}
