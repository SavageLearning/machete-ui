import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";
import { TransportProvider } from "src/app/online-orders/shared";
import { TransportProvidersStoreService } from "src/app/shared/services/transport-providers-store.service";

@Component({
  selector: "app-transport-provider",
  templateUrl: "./transport-provider.component.html",
  styleUrls: ["./transport-provider.component.css"],
})
export class TransportProviderComponent implements OnInit {
  public transportProviders$: Observable<TransportProvider[]>;
  public excludeCols: string[] = ["availabilityRules"];

  constructor(private store: TransportProvidersStoreService) {}

  handleRowSelect(selectedRecord: TransportProvider): void {
    // navigate to single record
    console.log(selectedRecord);
  }

  ngOnInit(): void {
    this.transportProviders$ = this.store.transportProviders$.pipe(
      filter((x) => x.length !== 0 || !x),
      first()
    );
  }
}
