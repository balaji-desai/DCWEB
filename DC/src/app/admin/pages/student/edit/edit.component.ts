import { Component, OnInit } from '@angular/core';
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { Student, AcademicYear, Department } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";
import { Router } from "@angular/router";
import { TokenProviderService } from "src/app/FW/token-provider.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  InstituteName: String;
  _msg: any;
  loading:boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public Student:FormGroup;
  public studentId:number;
  constructor(private fb:FormBuilder,private adminService:AdminService
              ,private activatedRoute:ActivatedRoute,
              private tokenProvider:TokenProviderService,
            private router:Router) { }

  ngOnInit() {
    this.loading = true;
    this.InstituteName = this.tokenProvider.getUser().InstituteName
    this.studentId = (+this.activatedRoute.snapshot.params.id);
    this.Years();
    this.Departments();
    this.buildform();
    this.getStudent();
  }
  private buildform()
  {
    this.Student = this.fb.group({
      FullName:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(30)]],
      Email:['',[Validators.required,Validators.maxLength(50),Validators.email]],
      ContactNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      Address:['',[Validators.required,Validators.maxLength(50)]],
      DepartmentId:['',[Validators.required, DropdownValidation]],
      YearId:['',[Validators.required,DropdownValidation]],
    });

    this.Student.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.Student);
    })
  }

  private Departments()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.GetDepartmentWithoutProxy().then(
      function(data){
        _me.departments = data;
        _me.loading = false;
      },
      function(error)
      {
        _me.loading = false;
      }
    )
  }

  private Years()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.getYear().then(
      function(data){
        _me.year = data;
        _me.loading = false;
      },
      function(error)
      {
        _me.loading = false;
      }
    )
  }

public getStudent(){
  var _me = this;
  this.adminService.getStudentById(this.studentId).then(
    function(data){
      _me.Student.patchValue(data);
      _me.loading = false;
    },
    function(error){
      _me.loading = false;
    }
  )
}
EditStudent(){
  var _me = this;
  if(this.Student.invalid)
    {
      this._msg = showLineError(this.Student);
      _me.loading = false;
      return;
    }

    var model = Object.assign({},this.Student.value);
    model.StudentId = this.studentId;
    this.adminService.EditStudent(model).then(
      function(data){
        _me.loading = false;
        _me.router.navigate(['/admin/std']);
      },
      function(error)
      {
        _me.loading = false;
        if (error.status == 400) {
          _me._msg["ServerMessage"] = error.error.Message;
        }
      }
    )
}

}
