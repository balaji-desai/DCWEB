import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { NotificationService } from "src/app/notification.service";
declare var $: any;

@Component({
  selector: 'app-examform',
  templateUrl: './examform.component.html',
  styleUrls: ['./examform.component.css']
})
export class ExamformComponent implements OnInit {
  _msg: any;
  loading:boolean = false;
  formList:Array<any> = [];
  constructor(private studentService:StudentService,
    private notificationService:NotificationService) { }

  ngOnInit() {
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
    this.loading = true;
    this.GetAllForms();
    this.notificationService.triggerNotificationAction();
  }

  GetAllForms(){
    var _me = this;
    this.studentService.GetAllForm().then(
      function(data){
        _me.loading = false;
        _me.formList = data;
      },
      function(error){
        _me.loading = false;
        if (error.status == 400) {
          _me._msg["ServerMessage"] = error.error.Message;
        }
      }
    )
  }

}
