import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/student/dashboard/dashboard.component";
import { DshComponent } from "src/app/student/pages/dsh/dsh.component";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "src/app/student/pages/profile/profile.component";
import { ExamformComponent } from "src/app/student/pages/examform/examform.component";
import { FormviewComponent } from "src/app/student/pages/formview/formview.component";
import { MysubjectComponent } from "src/app/student/pages/mysubject/mysubject.component";

const route:Routes=[
  {
    path:'',component:DashboardComponent,
    children:[
      {
        path:'',component:DshComponent
      },
      {
        path:'profile',component:ProfileComponent
      },
      {
        path:'myforms',component:ExamformComponent
      },
      {
        path:'view/:id',component:FormviewComponent
      },
      {
        path:'mysubject',component:MysubjectComponent
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
export class StudentRoutingModule { }
