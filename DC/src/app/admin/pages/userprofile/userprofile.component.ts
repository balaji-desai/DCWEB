import { Component, OnInit } from '@angular/core';
import { AdminProfile } from "src/app/app.model";
import { AdminService } from "src/app/admin/admin.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { showLineError, showLineErrorObj } from "src/app/FW/error";
import { api } from "src/app/FW/AppSetting";
import { TokenProviderService } from "src/app/FW/token-provider.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  InstituteId: number;
  public adminprofile:AdminProfile = new AdminProfile();
  public UserProfile:FormGroup;
  loading:boolean=false;
  selectedFiles: FileList;
  public tempurl:String;
  public _msg:any;
  public imageUrl:String = api.imageUrl;

  constructor(private adminService:AdminService,
              private tokenProviderService:TokenProviderService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.InstituteId = this.tokenProviderService.getUser().InstituteId;
    this._msg = {};
    this.UserProfile = this.fb.group({
      Institute:this.fb.group({
        InstituteName:['',[Validators.required,Validators.maxLength(50),Validators.pattern('^[A-Za-z0-9 ]+$')]],
        InstituteCode:['',[Validators.required,Validators.maxLength(5),Validators.pattern('^[A-Za-z0-9 ]+$')]],
        Address:['',[Validators.required,Validators.maxLength(50)]],
      }),
      FullName:['',[Validators.required,Validators.maxLength(25),Validators.pattern('^[a-zA-Z ]+$')]],
      Email:['',[Validators.required,Validators.maxLength(50),Validators.email]],
      ContactNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
    }
  );
  this.UserProfile.statusChanges.subscribe((v)=>{
    this._msg =  showLineError(this.UserProfile);
    this._msg = showLineErrorObj(this.UserProfile.get('Institute'),this._msg);
  });
  this.GetAdminDetails();
  }

  public GetAdminDetails()
  {
    var _me = this;
    _me.loading = true;
    this.adminService.GetAdminDetails().then(
      function(data){
        _me.loading = false;
        _me.UserProfile.patchValue(data);
      },
      function(error){
        _me.loading = false;
        console.log(error);
      }
    )

  }

  public SubmitUserProfile()
  {
    var _me = this;
    if(this.UserProfile.invalid == true)
      {
        this._msg = showLineError(this.UserProfile);
        this._msg = showLineErrorObj(this.UserProfile.get('Institute'),this._msg);
        this.loading = false;
        return;
      }
    var model = Object.assign({},this.UserProfile.value);
    this.adminService.UpdateProfile(model, this.selectedFiles).then(
      function(data){
        _me.loading = false;
      },
      function(error)
      {
        _me.loading = false;
        console.log(error);
      }
    )

  }

  selectFile(event) {
    const file = event.target.files.item(0)
    
    let fileList: FileList = event.target.files;

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files.item(0);
    } else {
      this._msg.InvalidPhoto= 'invalid format!';
    }
    if (fileList) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempurl = e.target.result;
      }
      reader.readAsDataURL(fileList.item(0));
  }
  }

}
