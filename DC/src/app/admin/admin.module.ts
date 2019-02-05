import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from "src/app/admin/admin-routing/admin-routing.module";
import { NavComponent } from './nav/nav.component';
import { DshComponent } from './pages/dsh/dsh.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { StudentComponent } from './pages/student/student.component';
import { CreateComponent } from './pages/student/create/create.component';
import { StaffComponent } from './pages/staff/staff.component';
import { StaffcreateComponent } from './pages/staff/staffcreate/staffcreate.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { FacultycreateComponent } from './pages/faculty/facultycreate/facultycreate.component';

@NgModule({
  declarations: [DashboardComponent, NavComponent, DshComponent, UserprofileComponent, StudentComponent, CreateComponent, StaffComponent, StaffcreateComponent, FacultyComponent, FacultycreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonImportModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DCInterceptor,
      multi: true
    },
    TokenProviderService
  ]
})
export class AdminModule { }
