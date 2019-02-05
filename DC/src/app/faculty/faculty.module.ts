import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DshComponent } from './pages/dsh/dsh.component';
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";
import { FacultyRoutingModule } from "src/app/faculty/faculty-routing/faculty-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { TokenProviderService } from "src/app/FW/token-provider.service";

@NgModule({
  declarations: [DashboardComponent, NavComponent, DshComponent],
  imports: [
    CommonModule
    ,FacultyRoutingModule
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
export class FacultyModule { }
