import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from "src/app/authentication/authentication-routing/authentication-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import { AppModule } from "src/app/app.module";
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CommonImportModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
