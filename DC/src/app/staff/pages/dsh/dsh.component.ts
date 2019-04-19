import { Component, OnInit } from '@angular/core';
import { StaffService } from "src/app/staff/staff.service";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { loggedInUser } from "src/app/FW/LoginModel";
declare var $: any;

@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.css']
})
export class DshComponent implements OnInit {
  _msg:any;
  public loading: boolean = false;
  formDetails = [];
  detailtype:String;
  data = {};
  loggedInUser:loggedInUser = new loggedInUser();
  constructor(private staffService:StaffService,private tokenProviderService:TokenProviderService) { }

  ngOnInit() {
    this._msg = {};
    $('#dataTables-list').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  this.loggedInUser = this.tokenProviderService.getUser();
  if(this.loggedInUser.UserType == 'Accountant')
    {
      this.GetFormStatus();
    }
  }

  GetFormStatus()
  {
    var _me = this;
    _me.loading = true;
    this.staffService.GetFormStatus().then(
      function(data){
        _me.formDetails = data;
        _me.loading = false;
      },
      function(error)
      {
        _me.loading = false;
      }
    )
  }

  openDetail(detailtype)
  {
    this.detailtype = detailtype;
    $('#'+this.detailtype).DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  this.GetData();
  }

  GetData()
  {
    var _me = this;
    _me.loading = true;
    this.staffService.GetDashDet(this.detailtype).then(
      function(data){
        _me.data = data;
        $('#model').modal({backdrop: 'static', keyboard: false});
        _me.loading = false;
      },
      function(error)
      {
        _me.loading = false;
      }
    )
  }

}
