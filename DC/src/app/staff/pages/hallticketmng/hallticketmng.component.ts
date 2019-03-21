import { Component, OnInit } from '@angular/core';
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";
import { Department, AcademicYear, Semister } from "src/app/app.model";
import { StaffService } from "src/app/staff/staff.service";
declare var $: any;

@Component({
  selector: 'app-hallticketmng',
  templateUrl: './hallticketmng.component.html',
  styleUrls: ['./hallticketmng.component.css']
})
export class HallticketmngComponent implements OnInit {
  _msg:any;
  private hallticket:FormGroup;
  default: number = 0;
  subjectDetail:any;
  public loading: boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public semister:Array<Semister> = new Array<Semister>();
  public currentsemister:Array<Semister> = new Array<Semister>(); 

  constructor(private fb:FormBuilder,private adminService:AdminService,
  private staffService:StaffService) { }

  ngOnInit() {
    this._msg = {};
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
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
    var curryear = this.hallticket.get('YearId').value;
    this.currentsemister =  this.semister.filter((x:Semister) => {
      return x.YearId == curryear;
    });
    this.hallticket.get('SemisterId').setValue(0);
  }
  private buildform()
  {
    this.hallticket = this.fb.group({
      StudentId:['',[Validators.required]],
      DepartmentId:[this.default,[Validators.required, DropdownValidation]],
      YearId:[this.default,[Validators.required,DropdownValidation]],
      SemisterId:[this.default,[Validators.required,DropdownValidation]],
      HallticketNo:['',[Validators.required]]
    });

    this.hallticket.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.hallticket);
    });
    this.hallticket.get('YearId').valueChanges.subscribe((value)=>{
      this.getCurrentSemister();
    });
  }

  getHallTicket(){
    var _me = this;
    if(this.hallticket.invalid)
      {
        this._msg = showLineError(this.hallticket);
        _me.loading = false;
        return;
      }
      var model = Object.assign({},this.hallticket.value);
      _me.staffService.SetHallTicket(model).then(
        function(data){
          _me.subjectDetail = data;
          _me.loading = false;
          $('#myModal').modal({backdrop: 'static', keyboard: false});
        },
        function(error){
          _me.loading = false;
          if (error.status == 400) {
            _me._msg["ServerMessage"] = error.error.Message;
          }
        }
      );
  }

}
