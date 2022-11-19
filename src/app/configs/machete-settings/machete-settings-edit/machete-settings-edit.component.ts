/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { merge, Observable, Subject } from "rxjs";
import { pluck, switchMap, takeWhile, tap } from "rxjs/operators";
import { Config } from "src/app/shared/models/config";
import { ConfigsService } from "../../configs.service";

@Component({
  selector: "app-machete-settings-edit",
  templateUrl: "./machete-settings-edit.component.html",
  styleUrls: ["./machete-settings-edit.component.css"],
})
export class MacheteSettingsEditComponent implements OnInit, OnDestroy {
  private routeRecordId: string;
  private isAlive = true;

  public record$: Observable<Config>;
  public activeTab = "register";
  public tpHelperText: string;
  public readonly TERMS_KEY: string = "OnlineOrdersTerms";
  private updatedRecord$: Subject<Config> = new Subject<Config>();
  private initialData$ = this.activatedRoute.params.pipe(
    pluck("id"),
    switchMap((id: string) => {
      this.routeRecordId = id;
      return this.configsService.getConfig(this.routeRecordId);
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configsService: ConfigsService,
    private primeConfirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.tpHelperText = `Machete settings make system changes. Proceed with caution`;

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

  public save(record: Config): void {
    this.configsService
      .update(record)
      .pipe(
        takeWhile(() => this.isAlive),
        tap((config: Config) => this.updatedRecord$.next(config))
      )
      .subscribe();
  }

  public onConfirmSave(event: Event, record: Config): void {
    this.primeConfirmService.confirm({
      target: event.target,
      message:
        "Are you sure that you want to save changes?. This cannot be undone",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.save(record);
      },
      reject: () => console.log("save canceled"),
    });
  }

  public async onCancel(): Promise<void> {
    await this.router.navigate(["/configuration/settings"]);
  }

  public onChildTermChange(data: string, r: Config): void {
    this.updatedRecord$.next({ ...r, value: data });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
