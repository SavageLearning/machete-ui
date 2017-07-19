import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenu }  from './app.menu.component';
import { AppTopBar}  from './app.topbar.component';
import { AppFooter}  from './app.footer.component';
import { InlineProfileComponent}  from './app.profile.component';
import { PageNotFoundComponent }   from './not-found.component';
import { Router } from '@angular/router';
import { inMemoryBackendServiceFactory, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AuthService} from './shared/services/auth.service';
import { Log } from 'oidc-client';
import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { TokenInterceptor } from './shared/services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    InlineProfileComponent,
    PageNotFoundComponent,
    AuthorizeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    if (!environment.production) {
      Log.level = Log.INFO;
      Log.logger = console;
    }
    Log.info('app.module.ctor()');
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
