import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { NgxMyDatePickerDirective, INgxMyDpOptions } from "ngx-mydatepicker";
import { Department, AcademicYear, Semister } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { Validators } from "@angular/forms";
import { showLineError } from "src/app/FW/error";
import { StaffService } from "src/app/staff/staff.service";
import { toDateModel } from "src/app/FW/commonfunctions";
declare var $: any;

@Component({
  selector: 'app-pushresult',
  templateUrl: './pushresult.component.html',
  styleUrls: ['./pushresult.component.css']
})
export class PushresultComponent implements OnInit {
  _msg:any;
  _msgpopup:any;
  subjectDetail:any;
  ResultArr=[];
  @ViewChild('dp') endDate: NgxMyDatePickerDirective;
  @ViewChild('sdp') startDate: NgxMyDatePickerDirective;
  public dateOptions: INgxMyDpOptions;
  default: number = 0;
  public loading: boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public semister:Array<Semister> = new Array<Semister>();
  public currentsemister:Array<Semister> = new Array<Semister>(); 
  public ResultForm:FormGroup;
  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private staffService:StaffService) { }

  ngOnInit() {
    this._msg = {};
    this._msgpopup = {};
    this.ResultArr = [];
     var startdatetime = new Date();
    this.dateOptions = {
      todayBtnTxt: 'Today',
      dateFormat: 'yyyy-mm-dd',
      sunHighlight: true,
      disableUntil: {year: startdatetime.getFullYear(), month: startdatetime.getMonth()+1, day: startdatetime.getDate()-1}
  };
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  $('#dataTables-list').DataTable({
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
    var curryear = this.ResultForm.get('YearId').value;
    this.currentsemister =  this.semister.filter((x:Semister) => {
      return x.YearId == curryear;
    });
    this.ResultForm.get('SemisterId').setValue(0);
  }

  private buildform()
  {
    this.ResultForm = this.fb.group({
      DepartmentId:[this.default,[Validators.required, DropdownValidation]],
      YearId:[this.default,[Validators.required,DropdownValidation]],
      SemisterId:[this.default,[Validators.required,DropdownValidation]],
    });

    this.ResultForm.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.ResultForm);
    });
    this.ResultForm.get('YearId').valueChanges.subscribe((value)=>{
      this.getCurrentSemister();
    });
  }

  getSubjects(){
    var _me = this;
    if(this.ResultForm.invalid)
      {
        this._msg = showLineError(this.ResultForm);
        _me.loading = false;
        return;
      }
      var model = Object.assign({},this.ResultForm.value);
      var i = this.ResultArr.findIndex((x) => { return x.DepartmentId == model.DepartmentId &&
        x.YearId == model.YearId && x.SemisterId == model.SemisterId});
        if(i >= 0)
          {
            _me.subjectDetail = this.ResultArr[i].SubjectList;
            _me.loading = false;
            $('#myModal').modal({backdrop: 'static', keyboard: false});
            return;
          }
      this.staffService.GetSubjects(model).then(
        function(data){
          _me.loading = false;
          _me.subjectDetail = data;
          $('#myModal').modal({backdrop: 'static', keyboard: false});
        },
        function(error){
          _me.loading = false;
          if (error.status == 400) {
            _me._msg["ServerMessage"] = error.error.Message;
          }
        }
      )
  }

  AddSeatNo(){
    var _me = this;
    var model = Object.assign({},this.ResultForm.value);
    model.SubjectList = this.subjectDetail;
    var dept = _me.departments.filter((x:Department) => {
      return x.DepartmentId == model.DepartmentId
    });
    model.DepartmentName = dept[0].Name;
    let date = new Date();
    model.startDate = {
      date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      };
    var i = this.ResultArr.findIndex((x) => { return x.DepartmentId == model.DepartmentId &&
    x.YearId == model.YearId && x.SemisterId == model.SemisterId});
    if(i < 0)
      {
        this.ResultArr.push(model);
      }
      else{
        this.ResultArr[i] = model;
      }
    console.log(model);
    $('#myModal').modal('hide');
  }

  EditRecord(rec){
    this.subjectDetail = rec.SubjectList;
    $('#myModal').modal({backdrop: 'static', keyboard: false});
  }

  pushResult(rec,index){
    var _me = this;
    rec.LaunchDate = toDateModel(rec.startDate.date);
    this.staffService.VerifySTD(rec).then(
      function(data){
        if(data.Code == 0)
          {
            rec.SubjectList.forEach(item => {
            var respdata =  data.Responce.filter((x)=>x.Id == item.SubjectId).map(function(el) {
              return el.Value;
          });
          if(respdata && respdata.length > 0)
            {
              item.Remark = "Invalid Seat No: "+respdata.join(",");
            }
            else{
              item.Remark = "";
            }
        });
              
            _me.EditRecord(rec);
          }
          else{
            _me.ResultArr.splice(index,1);
            _me._msgpopup["ServerMessage"] = 'Result Push Successfuly.';
            $('#popupmodel').modal({backdrop: 'static', keyboard: false});
          }
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
