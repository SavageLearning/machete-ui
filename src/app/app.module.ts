import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import {
  AppMenuComponent,
  AppSubMenuComponent,
} from "./menu/app.menu.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { InlineProfileComponent } from "./menu/app.profile.component";
import { PageNotFoundComponent } from "./not-found.component";
import { Router } from "@angular/router";

import { ToastModule } from "primeng/toast";

import { LoggingService } from "./shared/services/logging.service";
import { TransportProvidersService } from "./online-orders/transport-providers.service";
import { MessagesComponent } from "./shared/components/messages/messages.component";
import { ButtonModule } from "primeng/button";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CommonModule } from "@angular/common";

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
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log(".ctor: AppModule");
  }
}
