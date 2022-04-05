import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";
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

  constructor(private service: TransportProvidersService) {}

  handleRowSelect(selectedRecord: TransportProvider): void {
    // navigate to single record
    console.log(selectedRecord);
  }

  ngOnInit(): void {
    this.transportProviders$ = this.service.getTransportProviders();

    // filter((x) => x.length !== 0 || !x)
    // first()
  }
}
