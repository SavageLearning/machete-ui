import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import {AppMenuComponent,AppSubMenu}  from './app.menu.component';
import {AppTopBar}  from './app.topbar.component';
import {AppFooter}  from './app.footer.component';
import {InlineProfileComponent}  from './app.profile.component';
import { PageNotFoundComponent }   from './not-found.component';

import { inMemoryBackendServiceFactory, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    InlineProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule
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
