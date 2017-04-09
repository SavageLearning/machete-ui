import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { ReportsModule } from './reports/reports.module';
import { AppComponent } from './app.component';
import { inMemoryBackendServiceFactory, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReportsModule
    ,InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    {
      provide: XHRBackend,
      useFactory: getBackend,
      deps: [ Injector, BrowserXhr, XSRFStrategy, ResponseOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBackend(injector: Injector,
                           browser: BrowserXhr,
                           xsrf: XSRFStrategy,
                           options: ResponseOptions): any {
  {
    if (environment.production) {
      return new XHRBackend(browser, options, xsrf)
    } else {
      return inMemoryBackendServiceFactory(injector, new InMemoryDataService(), {})
    }
  }
}
