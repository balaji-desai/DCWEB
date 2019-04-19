import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { LoaderComponent } from "src/app/loader/loader.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationmessageComponent } from "src/app/FW/validationmessage/validationmessage.component";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { SecurePipe } from "src/app/FW/secure.pipe";
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LoaderComponent,
    ValidationmessageComponent,
    SecurePipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxLoadingModule.forRoot({}),
    NgxMyDatePickerModule.forRoot()
  ],
  exports:[
    FormsModule,
    HttpClientModule,
    NgxLoadingModule,
    LoaderComponent,
    ReactiveFormsModule,
    ValidationmessageComponent, 
    NgxMyDatePickerModule,
    SecurePipe,
    ChartsModule
  ],
  providers:[
  ]
})
export class CommonImportModule { }
