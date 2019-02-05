import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { api } from "src/app/FW/AppSetting";
import { HttpClient } from "@angular/common/http";
import { Promise } from "q";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 notificationTrigger:Subject<any> = new Subject();
 public apiUrl = api;
 constructor(private http: HttpClient) {

  }

  getNotificationSubscriber():Subject<any>{
    return this.notificationTrigger;
  }

  triggerNotificationAction(){
    this.notificationTrigger.next(true);
  }

  CopyStudentNotifications():Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.studentUrl +'copynotification'
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

   ViewNotification(viewnotificationid):Promise<any>{
    let promise = Promise((resolve, reject) => {
      this.http.get(api.adminUrl +'viewnotification',{params:{notificationviewid:viewnotificationid}}
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
