import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/admin/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DshComponent } from "src/app/admin/pages/dsh/dsh.component";
import { UserprofileComponent } from "src/app/admin/pages/userprofile/userprofile.component";
import { StudentComponent } from "src/app/admin/pages/student/student.component";
import { CreateComponent } from "src/app/admin/pages/student/create/create.component";
import { FacultyComponent } from "src/app/admin/pages/faculty/faculty.component";
import { FacultycreateComponent } from "src/app/admin/pages/faculty/facultycreate/facultycreate.component";
import { StaffComponent } from "src/app/admin/pages/staff/staff.component";
import { StaffcreateComponent } from "src/app/admin/pages/staff/staffcreate/staffcreate.component";

const route:Routes=[
  {path:'',component:DashboardComponent,
    children:[
      {
        path:'',component:DshComponent
      },
      {
        path:'profile',component:UserprofileComponent
      },
      {
        path:'std', component:StudentComponent
      },
      {
        path:"stdcreate",component:CreateComponent
      },
      {
        path:"faculty",component:FacultyComponent
      },
      {
        path:"facultycreate",component:FacultycreateComponent
      },
      {
        path:"staff",component:StaffComponent
      },
      {
        path:"staffcreate", component:StaffcreateComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
