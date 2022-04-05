import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransportProviderListComponent } from "./tranport-providers-list/transport-provider-list.component";
import { RecordsTableModule } from "src/app/shared/components/records-table/records-table.module";
import { TransportProvidersRoutingModule } from "./transport-providers-routing.module";
import { TransportProvidersEditComponent } from "./transport-providers-edit/transport-providers-edit.component";

@NgModule({
  declarations: [
    TransportProviderListComponent,
    TransportProvidersEditComponent,
  ],
  imports: [CommonModule, RecordsTableModule, TransportProvidersRoutingModule],
})
export class TransportProvidersModule {}
