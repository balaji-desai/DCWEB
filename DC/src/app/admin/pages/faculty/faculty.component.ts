import { Component, OnInit } from '@angular/core';
import { Faculty } from "src/app/app.model";
import { AdminService } from "src/app/admin/admin.service";
declare var $: any;

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  public loading:boolean=false;
  public faculty:Array<Faculty> = new Array<Faculty>();
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
  this.getFacultys();
  }

  getFacultys(){
    var _me = this;
    this.adminService.getFacultys().then(
      function(data){
        _me.faculty = data;
        _me.loading = false;
      },
      function(error){
        _me.loading = false;
      }
    )
  }

}
