import { Pipe, PipeTransform } from '@angular/core';
import { Subscription, BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { ChangeDetectorRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { WrappedValue } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TokenProviderService } from "src/app/FW/token-provider.service";
import { SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
  constructor(
      private http: HttpClient,
      private tokenProvider:TokenProviderService,
      private sanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
  }

  transform(url: string) {
    let domsen = this.sanitizer;
        return new Observable<SafeHtml>((observer) => {
          // This is a tiny blank image
          observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    
          // The next and error callbacks from the observer
          const {next, error} = observer;
    
          this.http.get(url, {
            responseType: 'blob',headers:{Authorization:'Bearer '+(this.tokenProvider.getUser() != null ? this.tokenProvider.getUser().AuthToken:"")
            //,"Content-Type":'image/*'
        }}).subscribe(response => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = function() {
              let url = domsen.bypassSecurityTrustUrl(reader.result.toString());
              observer.next(url);
            };
          });
    
          return {unsubscribe() {  }};
        });
      }
}
