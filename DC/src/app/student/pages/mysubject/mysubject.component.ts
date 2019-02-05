import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
declare var $: any;

@Component({
  selector: 'app-mysubject',
  templateUrl: './mysubject.component.html',
  styleUrls: ['./mysubject.component.css']
})
export class MysubjectComponent implements OnInit {
  _msg: any;
  loading:boolean = false;
  subjects:any=[];
  constructor(private studentService:StudentService) { }

  ngOnInit() {
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
    this.loading = true;
    this.GetSubject();
  }

  GetSubject(){
    var _me = this;
    this.studentService.GetSubjects().then(
      function(data){
        _me.subjects = data;
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

}
