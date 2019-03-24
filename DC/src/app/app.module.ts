import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DCInterceptor } from "src/app/FW/DC.intercepter";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from './loader/loader.component';
import { CommonImportModule } from "src/app/FW/common-import/common-import.module";
import { ValidationmessageComponent } from './FW/validationmessage/validationmessage.component';
import { ValidationDirective } from './FW/validation.directive';
import { SecurePipe } from './FW/secure.pipe';
import { NotifbuilderComponent } from './notifbuilder/notifbuilder/notifbuilder.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidationDirective,
    NotifbuilderComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    CommonImportModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DCInterceptor,
      multi: true
    },
    TokenProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
