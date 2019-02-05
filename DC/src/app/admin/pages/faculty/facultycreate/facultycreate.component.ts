import { Component, OnInit } from '@angular/core';
import { Department, FacultyType } from "src/app/app.model";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { AdminService } from "src/app/admin/admin.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";

@Component({
  selector: 'app-facultycreate',
  templateUrl: './facultycreate.component.html',
  styleUrls: ['./facultycreate.component.css']
})
export class FacultycreateComponent implements OnInit {
  InstituteName: String;
  default: any = 'select';
  _msg: any;
  loading:boolean = false;
  public departments:Array<Department> = new Array<Department>();
  public facultytype:Array<FacultyType> = new Array<FacultyType>();
  public Faculty:FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminService, private tokenProvider:TokenProviderService) { }

  ngOnInit() {
    this._msg = {};
    this.InstituteName = this.tokenProvider.getUser().InstituteName
    this.loading = true;
    this.Departments();
    this.FacultyTypes();
    this.buildform();
  }

  Departments()
  {
    var _me = this;
    this.adminService.GetDepartment().then(
      function(data){
        _me.departments = data;
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }

  FacultyTypes()
  {
    var _me = this;
    this.adminService.getFacultyType().then(
      function(data){
        _me.facultytype = data;
        _me.loading = false;
        return;
      },
      function(error){
        _me.loading = false;
      }
    )
  }

  buildform()
  {
    this.Faculty = this.fb.group({
      FullName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(30)]],
      ContactNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      EmailId:['',[Validators.required,Validators.maxLength(50),Validators.email]],
      Address:['',[Validators.required,Validators.maxLength(50)]],
      Qualification:['',[Validators.required,Validators.maxLength(30)]],
      FacultyTypeId:[this.default,[Validators.required, DropdownValidation]],
      DepartmentId:[this.default,[Validators.required, DropdownValidation]]
    });
    this.Faculty.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.Faculty);
    });
  }

  CreateFaculty()
  {
    var _me = this;
    if(this.Faculty.invalid)
      {
        this._msg = showLineError(this.Faculty);
        _me.loading = false;
      }

      var model = Object.assign({},this.Faculty.value);
      this.adminService.CreateFaculty(model).then(
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
