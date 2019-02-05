import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";
import { AcademicYear, Department, FormType, Semister } from "src/app/app.model";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { INgxMyDpOptions, NgxMyDatePickerDirective } from "ngx-mydatepicker";
import { ViewChild } from "@angular/core";
import { toDateModel } from "src/app/FW/commonfunctions";
import { StaffService } from "src/app/staff/staff.service";

@Component({
  selector: 'app-examform',
  templateUrl: './examform.component.html',
  styleUrls: ['./examform.component.css']
})
export class ExamformComponent implements OnInit {
  _msg:any;
  @ViewChild('dp') endDate: NgxMyDatePickerDirective;
  @ViewChild('sdp') startDate: NgxMyDatePickerDirective;
  public dateOptions: INgxMyDpOptions;
  public enddateOptions: INgxMyDpOptions;
  default: number = 0;
  public loading: boolean = false;
  public KTEnabled: boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public formtype:Array<FormType> = new Array<FormType>();
  public semister:Array<Semister> = new Array<Semister>();
  public currentsemister:Array<Semister> = new Array<Semister>(); 
  public ExamForm:FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminService, private tokenProvider:TokenProviderService
  ,private staffService:StaffService) { }

  ngOnInit() {
    var startdatetime = new Date();
    this.dateOptions = {
      todayBtnTxt: 'Today',
      dateFormat: 'yyyy-mm-dd',
      sunHighlight: true,
      disableUntil: {year: startdatetime.getFullYear(), month: startdatetime.getMonth()+1, day: startdatetime.getDate()-1}
  };
  this.enddateOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    sunHighlight: true,
    disableUntil: {year: startdatetime.getFullYear(), month: startdatetime.getMonth()+1, day: startdatetime.getDate()-1}
};
    this._msg = {};
    this.Departments();
    this.Years();
    this.FormType();
    this.Semister();
    this.buildform();
  }

  onStartDateCahnge(event){
    this.endDate.clearDate();
    var newDate = event.jsdate;
    this.endDate.options.disableUntil.day = newDate.getDate()-1;
    this.endDate.options.disableUntil.month = newDate.getMonth()+1;
    this.endDate.options.disableUntil.year = newDate.getFullYear();
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

  private FormType()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.GetFormType().then(
      function(data){
        _me.formtype = data;
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

  resetControls()
  {
    this.currentsemister = [];
    this.ExamForm.get('YearId').reset(this.default);
    this.ExamForm.get('DepartmentId').reset(this.default);
    var formtypeid = this.ExamForm.get('FormTypeId').value;
    if(formtypeid != 3)
      {
        this.ExamForm.get('SemisterId').clearValidators();
        this.KTEnabled = false;
        this.ExamForm.get('YearId').valueChanges.subscribe(()=>{});
      }
      else{
        this.ExamForm.get('SemisterId').setValidators(Validators.required);
        this.ExamForm.get('SemisterId').setValidators(DropdownValidation);
        this.ExamForm.get('YearId').valueChanges.subscribe((value)=>{
          this.getCurrentSemister();
        });
        this.KTEnabled = true;
      }
      this.ExamForm.get('SemisterId').reset(this.default);
  }

  CreatExamform()
  {
    var _me = this;
    if(this.ExamForm.invalid)
      {
        this._msg = showLineError(this.ExamForm);
        _me.loading = false;
        return;
      }
      if(this.startDate.isDateValid() == false)
        {
          this._msg = 'Invalid Start Date'
        }
        if(this.endDate.isDateValid() == false)
          {
            this._msg = 'Invalid End Date'
          }

      var model = Object.assign({},this.ExamForm.value);
      model.FillStartDate = toDateModel(model.FillStartDate.date);
      model.FillEndDate = toDateModel(model.FillEndDate.date);
      this.staffService.CreateForm(model).then(
        function(data){
          _me.buildform();
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


getCurrentSemister(){
  var curryear = this.ExamForm.get('YearId').value;
  this.currentsemister =  this.semister.filter((x:Semister) => {
    return x.YearId == curryear;
  });
}

  private buildform()
  {
    this.ExamForm = this.fb.group({
      Title:['',[Validators.required]],
      DepartmentId:[this.default,[Validators.required, DropdownValidation]],
      YearId:[this.default,[Validators.required,DropdownValidation]],
      FormTypeId:[this.default,[Validators.required,DropdownValidation]],
      SemisterId:[this.default],
      FillEndDate:[null,[Validators.required]],
      FillStartDate:[null,[Validators.required]]
    });

    this.ExamForm.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.ExamForm);
    })
  }
  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.ExamForm.patchValue({FillEndDate: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
    this.ExamForm.patchValue({FillStartDate: {
      date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()}
      }});
}

clearDate(): void {
    // Clear the date using the patchValue function
    this.ExamForm.patchValue({FillEndDate: null});
    this.ExamForm.patchValue({FillStartDate: null});
}
}
