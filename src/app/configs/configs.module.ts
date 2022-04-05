import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigsComponent } from "./configs.component";
import { ConfigsRoutingModule } from "./configs-routing.module";
import { TransportProvidersModule } from "./transport-providers/transport-providers.module";

@NgModule({
  imports: [CommonModule, ConfigsRoutingModule, TransportProvidersModule],
  declarations: [ConfigsComponent],
})
export class ConfigsModule {
  constructor() {
    console.log("ctor: ConfigsModule");
  }
}
