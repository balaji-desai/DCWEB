import { Component, OnInit } from '@angular/core';
import { Staff } from "src/app/app.model";
import { AdminService } from "src/app/admin/admin.service";
declare var $: any;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public loading:boolean=false;
  public staff:Array<Staff> = new Array<Staff>();
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.loading = true;
    $('#dataTables-example').DataTable({
      responsive: true,
      paging:   false,
      ordering: false,
      info:   false,
      searching: false
  });
  this.getStaff();
  }

  getStaff()
  {
    var _me = this;
    this.adminService.getStaffs().then(
      function(data){
        _me.staff = data;
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }

}
