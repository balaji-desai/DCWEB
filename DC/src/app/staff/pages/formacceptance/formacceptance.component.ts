import { Component, OnInit } from '@angular/core';
import { StudentService } from "src/app/student/student.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { StaffService } from "src/app/staff/staff.service";
import { showLineError } from "src/app/FW/error";
import { api } from "src/app/FW/AppSetting";
declare var $: any;

@Component({
  selector: 'app-formacceptance',
  templateUrl: './formacceptance.component.html',
  styleUrls: ['./formacceptance.component.css']
})
export class FormacceptanceComponent implements OnInit {
  formId: any;
  studentId: any;
  formdata: any = {};
  _msg: any;
  loading:boolean = false;
  searchForm:FormGroup;
  public imageUrl: String = api.imageUrl;
  public viewdetail:boolean=false;

  constructor(private studentService:StudentService,
              private staffService:StaffService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this._msg = {};
    this.buildform();
  }

  buildform(){
    this.searchForm = this.fb.group({
      StudentId:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
      FormId:['',[Validators.required,Validators.pattern('^[0-9]+$')]]
    });
    this.searchForm.statusChanges.subscribe((v)=>{
      this._msg =  showLineError(this.searchForm);
    });
  }
  getForm(){
    var _me = this;
    this.studentId = this.searchForm.get('StudentId').value;
    this.formId = this.searchForm.get('FormId').value;
    this.studentService.GetForm(this.formId,this.studentId).then(
      function(data){
        _me.formdata = data;
        _me.loading = false;
        _me.viewdetail = true;
        $('#formView').modal({backdrop: 'static', keyboard: false});
      },
      function(error){
        _me.loading = false;
        if (error.status == 400) {
          _me._msg["ServerMessage"] = error.error.Message;
        }
      }
    )
  }

  verifyForm()
  {
    var _me = this;
    if(this.searchForm.invalid){
      this._msg = showLineError(this.searchForm);
      this.loading = false;
      return;
    }
    var studentId = this.searchForm.get('StudentId').value;
    var formId = this.searchForm.get('FormId').value;
    this.staffService.verifyForm(studentId,formId).then(
      function(data){
        _me.getForm();
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

  AckVerificaton()
  {
    var _me = this;
    this.staffService.AckVerificaton(this.studentId,this.formId).then(
      function(data){
        _me.loading = false;
        $('#formView').modal('hide');
        _me._msg["ServerMessage"] = 'Verified Successfull.';
        $('#popupmodel').modal({backdrop: 'static', keyboard: false});
      },
      function(error){
        _me.loading = false;
      }
    )
  }

}
