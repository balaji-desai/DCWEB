import { Component, OnInit } from '@angular/core';
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { Department, AcademicYear, Semister } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";

@Component({
  selector: 'app-notifbuilder',
  templateUrl: './notifbuilder.component.html',
  styleUrls: ['./notifbuilder.component.css']
})
export class NotifbuilderComponent implements OnInit {
  default: number = 0;
  _msg:any;
  public loading: boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public semister:Array<Semister> = new Array<Semister>();
  public currentsemister:Array<Semister> = new Array<Semister>(); 
  public ResultForm:FormGroup;
  constructor(private fb:FormBuilder,
    private adminService:AdminService) { }

  ngOnInit() {
    this._msg = {};
    this.Departments();
    this.Years();
    this.Semister();
    this.buildform();
  }


  private Departments()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.GetDepartment().then(
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

  private Semister()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.getSemister().then(
      function(data){
        _me.semister = data;
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
  getCurrentSemister(){
    var curryear = this.ResultForm.get('YearId').value;
    this.currentsemister =  this.semister.filter((x:Semister) => {
      return x.YearId == curryear;
    });
    this.ResultForm.get('SemisterId').setValue(0);
  }

  private buildform()
  {
    this.ResultForm = this.fb.group({
      DepartmentId:[this.default,[DropdownValidation]],
      YearId:[this.default,[DropdownValidation]],
      SemisterId:[this.default,[DropdownValidation]],
    });

    this.ResultForm.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.ResultForm);
    });
    this.ResultForm.get('YearId').valueChanges.subscribe((value)=>{
      this.getCurrentSemister();
    });
  }

}
