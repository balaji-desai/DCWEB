import { Injectable } from '@angular/core';
import { loggedInUser } from "src/app/FW/LoginModel";

@Injectable({
  providedIn: 'root'
})
export class TokenProviderService {

  constructor() { }
  setUser(userVM:loggedInUser)
  {
    localStorage.setItem("_dcuser_",JSON.stringify(userVM))
  }

  getUser():loggedInUser
  {
    return JSON.parse(localStorage.getItem("_dcuser_"));
  }
}
