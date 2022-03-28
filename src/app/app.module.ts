import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import {
  AppMenuComponent,
  AppSubMenuComponent,
} from "./menu/app.menu.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { InlineProfileComponent } from "./menu/app.profile.component";
import { PageNotFoundComponent } from "./not-found.component";

import { ToastModule } from "primeng/toast";

import { MessagesComponent } from "./shared/components/messages/messages.component";
import { ButtonModule } from "primeng/button";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CommonModule } from "@angular/common";
import { ApiModule, Configuration } from "machete-client";
import { environment } from "../environments/environment";
import { FileDownloadHttpInterceptor } from "./FileDownloadHttpInterceptor";
/**
 * Import only the modules needed for the first render of the app
 * Only what's required for the components that load first before any other lazy loaded routes.
 * See the 'appRoutes' 'AppRoutingModules' routes for reference.
 *
 * ?? Don't import any services here. using the {providedIn: 'root'} config at the
 * ?? service level is sufficient
 */
@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBarComponent,
    AppFooterComponent,
    InlineProfileComponent,
    PageNotFoundComponent,
    MessagesComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ToastModule,
    ButtonModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${environment.dataUrl}`,
      });
    }),
    HttpClientModule,
  ],
  providers: [
    {
      // https://stackoverflow.com/questions/60864073/angular-5-api-swagger-body-responsetype-blob
      // generated-client doesn't detect octet stream properly
      provide: HTTP_INTERCEPTORS,
      useClass: FileDownloadHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log(".ctor: AppModule");
  }
}
