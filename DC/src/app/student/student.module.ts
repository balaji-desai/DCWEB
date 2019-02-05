import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DshComponent } from './pages/dsh/dsh.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";
import { StudentRoutingModule } from "src/app/student/student-routing/student-routing.module";
import { ProfileComponent } from './pages/profile/profile.component';
import { ExamformComponent } from './pages/examform/examform.component';
import { FormviewComponent } from './pages/formview/formview.component';
import { MysubjectComponent } from './pages/mysubject/mysubject.component';

@NgModule({
  declarations: [DashboardComponent, NavComponent, DshComponent, ProfileComponent, ExamformComponent, FormviewComponent, MysubjectComponent],
  imports: [
    CommonModule
    ,StudentRoutingModule
    ,CommonImportModule
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
export class StudentModule { }
