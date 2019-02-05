import { Injectable } from '@angular/core';
import { api } from "src/app/FW/AppSetting";
import { HttpClient } from "@angular/common/http";
import { Promise } from "q";
import { Student } from "src/app/app.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public apiUrl = api;
  constructor(private http: HttpClient) {

   }

   GetDashboard():Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'getdashboard'
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

   GetProfile():Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'getprofile'
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

   RecordStudentACK(student:Student):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.post(api.studentUrl +'recordstudentack',student
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

   GetAllForm():Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'getallform'
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
   GetForm(formId,studentId){
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'getform',{params:{formid:formId,studentid:studentId}}
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

   StudentFormResponce(formId){
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'studentformresponce',{params:{formid:formId}}
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

   GetSubjects(){
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'getsubjects'
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

   UploadPhoto(file){
   let formData:FormData = new FormData();
   formData.append("file",file);

    let promise = Promise((resolve, reject) => {
      this.http.post(api.studentUrl +'uploadphoto',formData
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
