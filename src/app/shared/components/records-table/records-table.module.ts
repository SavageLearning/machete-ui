import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecordsTableComponent } from "./records-table.component";

import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [RecordsTableComponent],
  imports: [CommonModule, TableModule, InputTextModule],
  exports: [RecordsTableComponent],
})
export class RecordsTableModule {}
