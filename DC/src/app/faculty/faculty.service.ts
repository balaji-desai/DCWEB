import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { api } from "src/app/FW/AppSetting";
import { Promise } from "q";
import { Subject } from "src/app/app.model";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  public apiUrl = api;
  constructor(private http: HttpClient) {

   }

   GetDashboard():Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.facultyUrl +'getdashboard'
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

   AddSubject(subject:Subject):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.facultyUrl +'addsubject',subject
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

   GetSubject(deptid,yearid):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.facultyUrl +'getsubjects',{params:{departmentid:deptid,yearid:yearid}}
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
