import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { ActivatedRoute } from "@angular/router";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { api } from "src/app/FW/AppSetting";
import { DomSanitizer } from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'app-formview',
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.css']
})
export class FormviewComponent implements OnInit {
  InstituteId: number;
  _msg: any;
  loading:boolean = false;
  formdata:any={};
  public imageUrl: String = api.imageUrl;
  private formId:number;

  constructor(private studentService:StudentService,
    private tokenProvider:TokenProviderService,
    private activatedRoute:ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this._msg = {}
    this.InstituteId = this.tokenProvider.getUser().InstituteId;
     this.formId = (+this.activatedRoute.snapshot.params.id);
     this.GetForm();
  }

  GetForm(){
    var _me = this;
    this.studentService.GetForm(this.formId,0).then(
      function(data){
        _me.formdata = data;
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

  StudentResponce(){
    var _me = this;
    this.studentService.StudentFormResponce(this.formId).then(
      function(data){
        _me.loading = false;
        _me.formdata.FormAction = 'print';
        _me._msg["ServerMessage"] = 'Form Submited Successfully';
        $('#popupmodel').modal({backdrop: 'static', keyboard: false});
      },
      function(error){
        _me.loading = false;
        if (error.status == 400) {
          _me._msg["ServerMessage"] = error.error.Message;
          $('#popupmodel').modal({backdrop: 'static', keyboard: false});
        }
      }
    )
  }
  

}
