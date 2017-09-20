import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenu }  from './menu/app.menu.component';
import { AppTopBar}  from './app.topbar.component';
import { AppFooter}  from './app.footer.component';
import { InlineProfileComponent}  from './menu/app.profile.component';
import { PageNotFoundComponent }   from './not-found.component';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService} from './shared/services/auth.service';

import { AuthorizeComponent } from './auth/authorize/authorize.component';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { OnlineOrdersModule } from './online-orders/online-orders.module';
import { ReportsModule } from './reports/reports.module';
import { ExportsModule } from './exports/exports.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { EmployersModule } from './employers/employers.module';

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
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReportsModule,
    OnlineOrdersModule,
    ExportsModule,
    WorkOrdersModule,
    EmployersModule,
    AppRoutingModule
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

    console.log('.ctor');
  }

}
