import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MegaMenuModule } from "primeng/megamenu";
import { SidebarModule } from "primeng/sidebar";

import { AppComponent } from "./app.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";
import { PageNotFoundComponent } from "./not-found.component";

import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";

import { MessagesComponent } from "./shared/components/messages/messages.component";
import { ButtonModule } from "primeng/button";
import { WelcomeComponent } from "./welcome/welcome.component";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ApiModule, Configuration } from "machete-client";
import { environment } from "../environments/environment";
import { FileDownloadHttpInterceptor } from "./FileDownloadHttpInterceptor";
import { MenuService } from "./app.menu.service";
import { AppBreadcrumbService } from "./app.breadcrumb.service";
import { AppInlineMenuComponent } from "./app.inlinemenu.component";
import { AppMainComponent } from "./app.main.component";
import { AppConfigComponent } from "./app.config.component";
import { AppRightMenuComponent } from "./app.rightmenu.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
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
    AppMainComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppInlineMenuComponent,
    AppRightMenuComponent,
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
    PageNotFoundComponent,
    MessagesComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    BreadcrumbModule,
    ButtonModule,
    DialogModule,
    MegaMenuModule,
    SidebarModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${environment.dataUrl}`,
        withCredentials: true,
      });
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    MenuService,
    AppBreadcrumbService,
    {
      // https://stackoverflow.com/questions/60864073/angular-5-api-swagger-body-responsetype-blob
      // generated-client doesn't detect octet stream properly
      useClass: FileDownloadHttpInterceptor,
      provide: HTTP_INTERCEPTORS,
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
