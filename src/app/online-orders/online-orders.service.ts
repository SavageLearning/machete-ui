import { map, tap } from "rxjs/operators";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { Confirm } from "./shared/models/confirm";
import { AppSettingsStoreService } from "../shared/services/app-settings-store.service";
import {
  ConfigVM as Config,
  WorkOrderVM as WorkOrder,
  WorkOrdersService as OrdersClient,
} from "machete-client";
import { OnlineOrderTerm } from "../configs/machete-settings/machete-settings-edit/online-order-term";

@Injectable({
  providedIn: "root",
})
export class OnlineOrdersService implements OnDestroy {
  storageKey = "machete.online-orders-service";
  initialConfirmKey = this.storageKey + ".initialconfirm";
  workOrderConfirmKey = this.storageKey + ".workorderconfirm";
  workAssignmentConfirmKey = this.storageKey + ".workassignmentsconfirm";

  private initialConfirmSource: BehaviorSubject<Confirm[]>;
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);
  private confirmChoices = new Array<Confirm>();
  private termsSubscription: Subscription;
  private terms$: Observable<Confirm[]> = this.appSettingsStore
    .getConfig("OnlineOrdersTerms")
    .pipe(
      map((config: Config) => JSON.parse(config.value) as OnlineOrderTerm[]),
      map((terms: OnlineOrderTerm[]) =>
        terms.map(
          (x) =>
            new Confirm({ name: x.name, description: x.text, confirmed: false })
        )
      ),
      tap((terms: Confirm[]) => (this.confirmChoices = terms))
    );

  constructor(
    private ordersClient: OrdersClient,
    private appSettingsStore: AppSettingsStoreService
  ) {
    console.log(".ctor: OnlineOrdersService");
    this.termsSubscription = this.terms$.subscribe(() =>
      this.loadConfirmState()
    );
  }
  ngOnDestroy(): void {
    this.termsSubscription.unsubscribe();
  }

  getInitialConfirmedStream(): Observable<Confirm[]> {
    return this.initialConfirmSource.asObservable();
  }

  getWorkOrderConfirmedStream(): Observable<boolean> {
    return this.workOrderConfirmSource.asObservable();
  }

  getWorkAssignmentConfirmedStream(): Observable<boolean> {
    return this.workAssignmentsConfirmSource.asObservable();
  }

  loadConfirmState(): void {
    // This pattern is ugly; should be able to simplify, perhaps use BehaviorSubjectSource instead
    // of companion private variable
    const loadedConfirms = JSON.parse(
      sessionStorage.getItem(this.initialConfirmKey)
    ) as Confirm[];
    if (loadedConfirms != null && loadedConfirms.length > 0) {
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(
        loadedConfirms
      );
    } else {
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(
        this.confirmChoices
      );
    }

    // notify the subscribers
    this.workOrderConfirmSource.next(
      sessionStorage.getItem(this.workOrderConfirmKey) === "true"
    );
    this.workAssignmentsConfirmSource.next(
      sessionStorage.getItem(this.workAssignmentConfirmKey) === "true"
    );
  }

  clearState(): void {
    console.log("OnlineOrdersService.clearState-----");
    this.setInitialConfirm(this.confirmChoices);
    this.setWorkorderConfirm(false);
    this.setWorkAssignmentsConfirm(false);
  }

  setInitialConfirm(choice: Confirm[]): void {
    //console.log('setInitialConfirm:', choice);
    sessionStorage.setItem(this.initialConfirmKey, JSON.stringify(choice));
    this.initialConfirmSource.next(choice);
  }

  setWorkorderConfirm(choice: boolean): void {
    //console.log('setWorkOrderConfirm:', choice);
    sessionStorage.setItem(this.workOrderConfirmKey, JSON.stringify(choice));
    this.workOrderConfirmSource.next(choice);
  }

  setWorkAssignmentsConfirm(choice: boolean): void {
    //console.log('setWorkAssignmentsConfirm:', choice);
    sessionStorage.setItem(
      this.workAssignmentConfirmKey,
      JSON.stringify(choice)
    );
    this.workAssignmentsConfirmSource.next(choice);
  }

  createOrder(order: WorkOrder): Observable<WorkOrder> {
    return this.ordersClient
      .apiWorkordersPost(order)
      .pipe(map((data) => data["data"] as WorkOrder));
  }
}
