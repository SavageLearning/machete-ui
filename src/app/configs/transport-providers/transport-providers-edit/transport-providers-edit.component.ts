import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { merge, Observable, of, Subject } from "rxjs";
import { pluck, switchMap, tap } from "rxjs/operators";
import { TransportProvider } from "src/app/online-orders/shared";
import { TransportProvidersService } from "src/app/online-orders/transport-providers.service";

import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-transport-providers-edit",
  templateUrl: "./transport-providers-edit.component.html",
  styleUrls: ["./transport-providers-edit.component.css"],
})
export class TransportProvidersEditComponent implements OnInit {
  private routeRecordId: number;

  public record$: Observable<TransportProvider>;
  public activeTab = "register";
  public tpHelperText: string;
  private updatedRecord$: Subject<TransportProvider> =
    new Subject<TransportProvider>();
  private initialData$ = this.activatedRoute.params.pipe(
    pluck("id"),
    switchMap((id: string) => {
      if (id === "new") {
        return of(new TransportProvider());
      }
      const routeParam = parseInt(id);
      this.routeRecordId = routeParam;
      return this.tpService.getById(routeParam);
    }),
    tap(() => console.log("new subscription"))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tpService: TransportProvidersService,
    private primeConfirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.tpHelperText = `Transport providers are used as options for transportation methods.
    Any availability rules you set will apply on the online hiring portal`;

    this.record$ = merge(
      this.initialData$.pipe(
        tap(() => console.log("on init: form set with initial"))
      ),
      this.updatedRecord$.pipe(
        tap(() =>
          console.log("post update/create: form refresehed with API result")
        )
      )
    );
  }

  public save(record: TransportProvider, isDelete?: boolean): void {
    this.tpService
      .save(record, isDelete)
      .pipe(tap((tp: TransportProvider) => this.updatedRecord$.next(tp)))
      .subscribe();
  }

  public async cancel(): Promise<void> {
    await this.router.navigate(["configuration/transport-providers"]);
  }

  private deActivate(record: TransportProvider): void {
    this.save({ ...record, active: false }, true);
  }

  public confirm(event: Event, record: TransportProvider): void {
    this.primeConfirmService.confirm({
      target: event.target,
      message:
        "Are you sure that you want to delete this provider. This cannot be undone",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        this.deActivate(record);
        await this.cancel();
      },
      reject: () => {
        //reject action
      },
    });
  }
}
