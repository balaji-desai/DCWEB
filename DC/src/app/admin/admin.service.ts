import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { api } from "src/app/FW/AppSetting";
import { AdminProfile, Student, Faculty, Staff } from "src/app/app.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public apiUrl = api;
  constructor(private http: HttpClient) {

   }

   public GetAdminDetails(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getadmindetail'
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


  public UpdateProfile(admin:AdminProfile,file): Promise<any> {
    var _me = this;
    let formData:FormData = new FormData();
    formData.append("file",file);
    formData.append("adminmodel",JSON.stringify(admin));
    let promise = new Promise((resolve, reject) => {
      this.http.post(api.adminUrl +'updateprofile',formData
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
  public GetDepartmentWithoutProxy(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getdeptwithoutproxy'
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
  public GetDepartment(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getdept'
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

  public GetFormType(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getformtype'
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

  public getYear(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getyear'
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

  public getDeptYear(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getdeptyear'
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
  public CreateStudent(student:Student): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.post(api.adminUrl +'createstudent',student
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

  public EditStudent(student:Student): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.post(api.adminUrl +'editstudent',student
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

  public getFacultys(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getfacultys'
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

  public getSemister(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getsemister'
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

  public getStudent(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getstudents'
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
  public getStudentById(id): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getstudentbyid',{params:{studentid:id}}
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

  public getStaffs(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getstaffs'
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
  public CreateFaculty(faculty:Faculty): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.post(api.adminUrl +'createfaculty',faculty
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

  public getFacultyType(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getfacultytype'
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

  public getStaffType(): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'getsatfftype'
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

  public CreateStaff(staff:Staff): Promise<any> {
    var _me = this;
    let promise = new Promise((resolve, reject) => {
      this.http.post(api.adminUrl +'createstaff',staff
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
