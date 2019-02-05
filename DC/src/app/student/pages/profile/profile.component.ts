import { Component, OnInit } from '@angular/core';
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { StudentService } from "src/app/student/student.service";
import { StudentProfile } from "src/app/app.model";
import { api } from "src/app/FW/AppSetting";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _msg: any;
  loading:boolean = false;
  selectedFiles: FileList;
  public tempurl:String;
  public imageUrl:String = api.imageUrl;

  public studentprofile:StudentProfile;
  constructor(private studentService:StudentService,
    private tokenProviderService:TokenProviderService) { }

  ngOnInit() {
    this._msg = {};
    this.loading = true;
    this.studentprofile = new StudentProfile();
    this.getProfile();
  }

  private getProfile()
  {
    var _me = this;
    this.studentService.GetProfile().then(
      function(data){
        _me.studentprofile = data;
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
  this.uploadProfilePhoto();
  }

  uploadProfilePhoto(){
    var _me = this;
    _me.loading = true;
    this.studentService.UploadPhoto(this.selectedFiles).then(
      function(data){
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
