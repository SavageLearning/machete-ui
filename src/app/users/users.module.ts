import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";
import { UsersDatatableComponent } from './users-datatable/users-datatable.component';

@NgModule({
  declarations: [UsersComponent, UsersDatatableComponent],
  imports: [CommonModule],
})
export class UsersModule {
  constructor() {
    console.log(".ctor: UsersModule");
  }
}
