import { Component, OnInit } from '@angular/core';
import { FacultyService } from "src/app/faculty/faculty.service";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { AdminService } from "src/app/admin/admin.service";
import { AcademicYear, Semister, DashboardVM, Subject } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";
import { loggedInUser } from "src/app/FW/LoginModel";
declare var $: any;

@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.css']
})
export class DshComponent implements OnInit {
  _msg: any;
  loading:boolean = false;
  public Setup:FormGroup;
  public showsetup:boolean = false;
  public userDetail:loggedInUser;
  private dashboard:DashboardVM;
  public subject:Array<Subject> = new Array<Subject>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();
  public semister:Array<Semister> = new Array<Semister>();
  public currentsemister:Array<Semister> = new Array<Semister>();
  constructor(private facultyService:FacultyService,
    private adminService:AdminService,
    private fb:FormBuilder,
    private tokenProviderService:TokenProviderService) { }

  ngOnInit() {
    this._msg = {};
    this.userDetail = this.tokenProviderService.getUser();
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  this.showsetup = false;
  this.buildform();
    this.GetDashboard();
  }

  GetDashboard(){
    var _me = this;
    this.facultyService.GetDashboard().then(
      function(data){
        _me.dashboard = data;
        if(data.IsSetupComplete == false){
          _me.showsetup = true;
          _me.getYears();
          _me.getSemister();
         $('#myModal').modal({backdrop: 'static', keyboard: false});
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
close()
{
  $('#myModal').modal('hide')
}

getYears(){
  var _me = this;
  this.adminService.getDeptYear().then(
    function(data){
      _me.year = data;
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
getSemister(){
  var _me = this;
  this.adminService.getSemister().then(
    function(data){
      _me.loading = false;
      _me.semister = data;
    },
    function(error){
      _me.loading = false;
      if (error.status == 400) {
        _me._msg["ServerMessage"] = error.error.Message;
      }
    }
  )
}

public buildform(){
  this.Setup = this.fb.group({
    Name:['',[Validators.required]],
    YearId:['select',[DropdownValidation]],
    SemisterId:['select',[DropdownValidation]],
    Evaluation:['true',[Validators.required]]
  });
  this.Setup.statusChanges.subscribe((v)=>{
    this._msg = showLineError(this.Setup);
  });
}

getCurrentSemister(){
  var curryear = this.Setup.get('YearId').value;
  this.currentsemister =  this.semister.filter((x:Semister) => {
    return x.YearId == curryear;
  });
  this.GetSubjects(curryear);
}

AddSubject(){
  var _me = this;
  if(this.Setup.invalid)
    {
      this._msg = showLineError(this.Setup);
      _me.loading = false;
      return;
    }
    var model = Object.assign({},this.Setup.value);
    model.DepartmentId = this.dashboard.DepartmentId;
    this.facultyService.AddSubject(model).then(
      function(data){
        _me.GetSubjects(model.YearId);
        _me.loading = false;
          },
          function(error){
            _me.loading = false;
            if (error.status == 400) {
              _me._msg["ServerMessage"] = error.error.Message;
            }
          }
      );
}

GetSubjects(yearId:number)
{
  var _me =this;
  _me.loading = true;
  this.facultyService.GetSubject(this.dashboard.DepartmentId,yearId).then(
    function(data){
      _me.subject = data;
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

openSetting(){
  this.showsetup = true;
  this.buildform();
  this.getYears();
  this.getSemister();
 $('#myModal').modal({backdrop: 'static', keyboard: false});
}

}
