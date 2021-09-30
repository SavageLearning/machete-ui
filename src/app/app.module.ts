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

import { ToastModule } from "primeng/toast";

import { MessagesComponent } from "./shared/components/messages/messages.component";
import { MessagesService } from "./shared/components/messages/messages.service";
import { AuthorizeComponent } from "./auth";
import { ReportsModule } from "./reports/reports.module";
import { OnlineOrdersModule } from "./online-orders/online-orders.module";
import { ExportsModule } from "./exports/exports.module";
import { WorkersModule } from "./workers/workers.module";
import { EmployersModule } from "./employers/employers.module";
import { MyWorkOrdersModule } from "./my-work-orders/my-work-orders.module";
import { AuthService, LoggingService } from "./shared";
import { TransportProvidersService } from "./online-orders/transport-providers.service";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { MenubarModule } from "primeng/menubar";

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
    CardModule,
    DialogModule,
    MenubarModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
  ],
  providers: [
    AuthService,
    LoggingService,
    TransportProvidersService,
    MessagesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log(".ctor: AppModule");
  }
}
