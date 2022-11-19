import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TransportProvider } from "src/app/online-orders/shared";
import { TransportProvidersService } from "src/app/online-orders/transport-providers.service";

@Component({
  selector: "app-transport-list-provider",
  templateUrl: "./transport-provider-list.component.html",
  styleUrls: ["./transport-provider-list.component.css"],
})
export class TransportProviderListComponent implements OnInit {
  public transportProviders$: Observable<TransportProvider[]>;
  public excludeCols: string[] = ["availabilityRules"];

  constructor(
    private service: TransportProvidersService,
    private router: Router
  ) {}

  async onRowSelect(selectedRecord: TransportProvider): Promise<void> {
    await this.router.navigate([
      `configuration/transport-providers/${selectedRecord.id}`,
    ]);
  }

  ngOnInit(): void {
    this.transportProviders$ = this.service.getTransportProviders();
  }
}
