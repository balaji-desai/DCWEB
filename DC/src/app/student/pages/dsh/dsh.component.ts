import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { loggedInUser } from "src/app/FW/LoginModel";
import { StudentDashboardVM, Student, NotificationView } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { showLineError } from "src/app/FW/error";
import { NotificationService } from "src/app/notification.service";
declare var $: any;
@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.css']
})
export class DshComponent implements OnInit {
  userDetail: loggedInUser;
  notificationmodel:NotificationView;
  public ACK:FormGroup;

  dashboard:StudentDashboardVM = new StudentDashboardVM();
  _msg: any;
  loading:boolean = false;
  constructor(private studentService:StudentService,
    private fb:FormBuilder,
    private tokenProviderService:TokenProviderService,
  private notificationService:NotificationService) { }
    
    ngOnInit() {
      this.loading = true
    this.userDetail = this.tokenProviderService.getUser();
    this._msg = {};
    this.buildform();
    this.GetDashboard();
    this.notificationService.triggerNotificationAction();
  }

  GetDashboard(){
    var _me = this;
    this.studentService.GetDashboard().then(
      function(data){
        _me.dashboard = data;
        _me.loading = false;
        
      },
      function(error){
        _me.loading = false;
        if (error.status == 400) {
          _me._msg["ServerMessage"] = error.error.Message;
        }
      }
    )
  }

  viewNotification(notificationViewId){
    var _me = this;
    _me.loading = true;
    this.notificationService.ViewNotification(notificationViewId).then(
      function(data){
        _me.notificationmodel = data;
        var index = _me.dashboard.Notifications.findIndex(x => x.NotificationViewId == notificationViewId);
        _me.dashboard.Notifications[index].IsView = true;
        $('#notificationModel').modal({backdrop: 'static', keyboard: false});
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }
  close()
  {
    $('#notificationModel').modal('hide')
  }


public ACKWrongClick(){
  $('#ackmodel').modal({backdrop: 'static', keyboard: false});
}

public SendResponce(ack:boolean){
  var _me = this;
  this.loading = true;
  if(this.ACK.invalid && ack==false){
    this._msg = showLineError(this.ACK);
    this.loading = false;
    return;
  }
  var student = new Student();
  student.ACK = ack;
  student.Note = ack==false ?this.ACK.get('Reason').value:null;
  this.studentService.RecordStudentACK(student).then(
    function(){
      _me.closeACK();
      _me.GetDashboard();
    },
    function(error){
      _me.loading = false;
      if (error.status == 400) {
        _me._msg["ServerMessage"] = error.error.Message;
      }
    }
  )
}

closeACK(){
  $('#ackmodel').modal('hide')
}

public buildform(){
  this.ACK = this.fb.group(
    {
      Reason:['',[Validators.required]]
    }
  );
  this.ACK.statusChanges.subscribe((v)=>{
    this._msg = showLineError(this.ACK);
  });
}

}
