import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// import { HttpClientModule, XHRBackend, BrowserXhr, ResponseOptions,  XSRFStrategy } from '@angular/http';
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent }  from './menu/app.menu.component';
import { AppTopBarComponent }  from './app.topbar.component';
import { AppFooterComponent }  from './app.footer.component';
import { InlineProfileComponent }  from './menu/app.profile.component';
import { PageNotFoundComponent }   from './not-found.component';

import { ToastModule } from 'primeng/toast';

import { MessagesComponent } from './shared/components/messages/messages.component';
import { MessagesService } from './shared/components/messages/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    InlineProfileComponent,
    PageNotFoundComponent,
    AuthorizeComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReportsModule,
    OnlineOrdersModule,
    ExportsModule,
    MyWorkOrdersModule,
    EmployersModule,
    WorkersModule,
    AppRoutingModule,
    ToastModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [
    AuthService,
    LoggingService,
    TransportProvidersService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log('.ctor: AppModule');
  }

}
