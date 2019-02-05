import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DshComponent } from './pages/dsh/dsh.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { StaffRoutingModule } from "src/app/staff/staff-routing/staff-routing.module";
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";
import { ExamformComponent } from './pages/examform/examform.component';
import { FormacceptanceComponent } from './pages/formacceptance/formacceptance.component';

@NgModule({
  declarations: [DashboardComponent, NavComponent, DshComponent, ExamformComponent, FormacceptanceComponent],
  imports: [
    CommonModule
    ,StaffRoutingModule
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
export class StaffModule { }
