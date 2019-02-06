import { Component, OnInit } from '@angular/core';
import { AdminService } from "src/app/admin/admin.service";
import { Student } from "src/app/app.model";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public loading:boolean=false;
  public curStudent:Student;
  public _message:String;
  public students:Array<Student> = new Array<Student>();
  constructor(private adminService:AdminService,
              private router:Router) { }

  ngOnInit() {
    this.loading = true;
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  this.getStudents();
  }

  public getStudents()
  {
    var _me = this;
    this.adminService.getStudent().then(
      function(data){
        _me.students = data;
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }

  public MessageOpen(std:Student){
    this.curStudent = std;
    this._message = std.Note;
    $('#messageModel').modal({backdrop: 'static', keyboard: false});
  }

  public EditStudent(){
    $('#messageModel').modal('hide');
    this.router.navigate(['/admin/stdedit',this.curStudent.StudentId]);
  }

}
