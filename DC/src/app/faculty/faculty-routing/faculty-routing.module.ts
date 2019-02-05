import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { DshComponent } from "src/app/faculty/pages/dsh/dsh.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "src/app/faculty/dashboard/dashboard.component";

const route:Routes=[
  {
    path:'',component:DashboardComponent,
    children:[
      {
        path:'',component:DshComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    ,RouterModule.forChild(route)
  ],
exports:[RouterModule]
})
export class FacultyRoutingModule { }
