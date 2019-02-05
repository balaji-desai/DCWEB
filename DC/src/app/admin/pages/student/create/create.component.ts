import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AdminService } from "src/app/admin/admin.service";
import { showLineError } from "src/app/FW/error";
import { Department, AcademicYear } from "src/app/app.model";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { TokenProviderService } from "src/app/FW/token-provider.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  InstituteName: String;
  default: any = 'select';
  _msg: any;
  loading:boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public year:Array<AcademicYear> = new Array<AcademicYear>();

  public Student:FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminService, private tokenProvider:TokenProviderService) { }

  ngOnInit() {
   this._msg = {};
   this.InstituteName = this.tokenProvider.getUser().InstituteName
   this.Departments();
   this.Years();
   this.buildform();
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

  private buildform()
  {
    this.Student = this.fb.group({
      FullName:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(30)]],
      Email:['',[Validators.required,Validators.maxLength(50),Validators.email]],
      ContactNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      Address:['',[Validators.required,Validators.maxLength(50)]],
      DepartmentId:[this.default,[Validators.required, DropdownValidation]],
      YearId:[this.default,[Validators.required,DropdownValidation]],
    });

    this.Student.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.Student);
    })
  }
  SubmitStudent()
  {
    var _me = this;
    if(this.Student.invalid)
      {
        this._msg = showLineError(this.Student);
        _me.loading = false;
        return;
      }

      var model = Object.assign({},this.Student.value);
      this.adminService.CreateStudent(model).then(
        function(data){
          _me.loading = false;
          _me.buildform();
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
