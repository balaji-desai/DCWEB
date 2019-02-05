import { Component, OnInit } from '@angular/core';
import { StaffType } from "src/app/app.model";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { AdminService } from "src/app/admin/admin.service";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { Validators } from "@angular/forms";
import { DropdownValidation } from "src/app/FW/customvalidation";
import { showLineError } from "src/app/FW/error";

@Component({
  selector: 'app-staffcreate',
  templateUrl: './staffcreate.component.html',
  styleUrls: ['./staffcreate.component.css']
})
export class StaffcreateComponent implements OnInit {
  InstituteName: String;
  default: any = 'select';
  _msg: any;
  loading:boolean = false;
  public stafftype:Array<StaffType> = new Array<StaffType>();
  public Staff:FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminService, private tokenProvider:TokenProviderService) { }


  ngOnInit() {
    this._msg = {};
    this.loading = true;
    this.getStaffType();
    this.buildform();
  }
  getStaffType()
  {
    var _me = this;
    this.adminService.getStaffType().then(
      function(data){
        _me.stafftype = data;
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }
  buildform()
  {
    this.Staff = this.fb.group({
      FullName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(30)]],
      ContactNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      EmailId:['',[Validators.required,Validators.maxLength(50),Validators.email]],
      Address:['',[Validators.required,Validators.maxLength(50)]],
      StaffTypeId:[this.default,[Validators.required, DropdownValidation]]
    });
    this.Staff.statusChanges.subscribe((v)=>{
      this._msg = showLineError(this.Staff);
    });
  }

  CreateStaff()
  {
    var _me = this;
    if(this.Staff.invalid)
      {
        this._msg = showLineError(this.Staff);
        _me.loading = false;
        return;
      }

      var model = Object.assign({},this.Staff.value);
      this.adminService.CreateStaff(model).then(
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
