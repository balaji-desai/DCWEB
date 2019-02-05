import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/authentication/login/login.component";
import { RouterModule } from "@angular/router";
import { MediatorService } from "src/app/FW/mediator.service";

const route:Routes = [
  { 
    path:'',component:LoginComponent
  },
  {
    path:'admin',loadChildren:"../../admin/admin.module#AdminModule",canActivate: [MediatorService]
  },
  {
    path:'faculty',loadChildren:"../../faculty/faculty.module#FacultyModule",canActivate: [MediatorService]
  },
  {
    path:'student',loadChildren:"../../student/student.module#StudentModule",canActivate: [MediatorService]
  },
  {
    path:'staff',loadChildren:"../../staff/staff.module#StaffModule",canActivate: [MediatorService]
  }
]

@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class AuthenticationRoutingModule { }
