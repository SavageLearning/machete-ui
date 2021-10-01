import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigsComponent } from "./configs.component";
import { ConfigsRoutingModule } from "./configs-routing.module";
import { TransportProviderComponent } from "./transport-provider/transport-provider.component";
import { RecordsTableModule } from "../shared/components/records-table/records-table.module";

@NgModule({
  imports: [CommonModule, ConfigsRoutingModule, RecordsTableModule],
  declarations: [ConfigsComponent, TransportProviderComponent],
})
export class ConfigsModule {
  constructor() {
    console.log("ctor: ConfigsModule");
  }
}
