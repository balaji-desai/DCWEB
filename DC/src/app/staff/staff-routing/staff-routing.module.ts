import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/staff/dashboard/dashboard.component";
import { DshComponent } from "src/app/staff/pages/dsh/dsh.component";
import { RouterModule } from "@angular/router";
import { ExamformComponent } from "src/app/staff/pages/examform/examform.component";
import { FormacceptanceComponent } from "src/app/staff/pages/formacceptance/formacceptance.component";
import { HallticketmngComponent } from "src/app/staff/pages/hallticketmng/hallticketmng.component";
import { PushresultComponent } from "src/app/staff/pages/pushresult/pushresult.component";
const route: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {
        path:'',component:DshComponent
      },
      {
        path:'examtrigger',component:ExamformComponent
      },
      {
        path:'form-acceptance',component:FormacceptanceComponent
      },
      {
        path:'hallticket-mng',component:HallticketmngComponent
      },
      {
        path:'push-result',component:PushresultComponent
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
export class StaffRoutingModule { }
