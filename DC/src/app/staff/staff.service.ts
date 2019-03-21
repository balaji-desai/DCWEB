import { Injectable } from '@angular/core';
import { api } from "src/app/FW/AppSetting";
import { HttpClient } from "@angular/common/http";
import { FormModel } from "src/app/app.model";
import { Promise } from "q";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  public apiUrl = api;
  constructor(private http: HttpClient) {

   }

   CreateForm(form:FormModel):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.staffUrl +'createform',form
      ).toPromise().then(
        function (resp) {
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
   }
   
   verifyForm(studentId,formId):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.staffUrl +'verifyform',{params:{formid:formId,studentid:studentId}}
      ).toPromise().then(
        function (resp) {
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
   }
   
   AckVerificaton(studentId,formId):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.staffUrl +'ackverification',{params:{formid:formId,studentid:studentId}}
      ).toPromise().then(
        function (resp) {
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
   }

   SetHallTicket(studentdata):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.staffUrl +'sethallticket',studentdata
      ).toPromise().then(
        function (resp) {
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
   }

   GetSubjects(studentdata):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.staffUrl +'getsubject',studentdata
      ).toPromise().then(
        function (resp) {
          resolve(resp);
        },
        function (error) {
          reject(error);
        }
        )
    });
    return promise;
   }

   VerifySTD(studentdata):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.staffUrl +'verifysubject',studentdata
      ).toPromise().then(
        function (resp) {
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
