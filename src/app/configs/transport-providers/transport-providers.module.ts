import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransportProviderListComponent } from "./tranport-providers-list/transport-provider-list.component";
import { RecordsTableModule } from "src/app/shared/components/records-table/records-table.module";
import { TransportProvidersRoutingModule } from "./transport-providers-routing.module";
import { TransportProvidersEditComponent } from "./transport-providers-edit/transport-providers-edit.component";
import { TransportProvidersContainerComponent } from "./transport-providers-container.component";

import { TabViewModule } from "primeng/tabview";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { DividerModule } from "primeng/divider";
import { FieldsetModule } from "primeng/fieldset";
import { CardModule } from "primeng/card";
import { ChipModule } from "primeng/chip";
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService } from "primeng/api";
@NgModule({
  declarations: [
    TransportProviderListComponent,
    TransportProvidersEditComponent,
    TransportProvidersContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecordsTableModule,
    TransportProvidersRoutingModule,
    TabViewModule,
    InputTextModule,
    DividerModule,
    FieldsetModule,
    CardModule,
    ChipModule,
    ButtonModule,
    ToolbarModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService],
})
export class TransportProvidersModule {}
