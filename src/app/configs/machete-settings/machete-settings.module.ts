import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MacheteSettingsRoutingModule } from "./machete-settings-routing.module";
import { MacheteSettingsComponent } from "./machete-settings.component";
import { MacheteSettingsListComponent } from "./machete-settings-list/machete-settings-list.component";
import { RecordsTableModule } from "src/app/shared/components/records-table/records-table.module";
import { MacheteSettingsEditComponent } from "./machete-settings-edit/machete-settings-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { FieldsetModule } from "primeng/fieldset";
import { ChipModule } from "primeng/chip";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { InputTextareaModule } from "primeng/inputtextarea";

import { ConfirmationService } from "primeng/api";
import { MacheteSettingsTermFormComponent } from "./machete-settings-edit/machete-settings-term-form.component";

@NgModule({
  declarations: [
    MacheteSettingsComponent,
    MacheteSettingsListComponent,
    MacheteSettingsEditComponent,
    MacheteSettingsTermFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MacheteSettingsRoutingModule,
    RecordsTableModule,
    InputTextModule,
    DividerModule,
    FieldsetModule,
    CardModule,
    ChipModule,
    ButtonModule,
    ToolbarModule,
    ConfirmPopupModule,
    InputTextareaModule,
  ],
  providers: [ConfirmationService],
})
export class MacheteSettingsModule {}
