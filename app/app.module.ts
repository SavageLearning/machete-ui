import {NgModule}      from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import {AppComponent}  from './app.component';
import {EmployerListComponent} from './employer_list.component';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule, TabViewModule} from 'primeng/primeng';
import {EmployerService} from "./services/employer.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    TabViewModule
  ],
  declarations: [AppComponent, EmployerListComponent],
  bootstrap: [AppComponent],
  providers: [EmployerService]
})
export class AppModule {
}
