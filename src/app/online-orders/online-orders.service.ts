import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { WorkOrder } from "../shared/models/work-order";
import { HttpHeaders } from "@angular/common/http";

import { Confirm } from "./shared/models/confirm";
import { loadConfirms } from "./shared/rules/load-confirms";
import { OnlineOrdersService as OnlineOrdersClient } from "machete-client";
@Injectable()
export class OnlineOrdersService {
  storageKey = "machete.online-orders-service";
  initialConfirmKey = this.storageKey + ".initialconfirm";
  workOrderConfirmKey = this.storageKey + ".workorderconfirm";
  workAssignmentConfirmKey = this.storageKey + ".workassignmentsconfirm";

  private initialConfirmSource: BehaviorSubject<Confirm[]>;
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);

  constructor(private client: OnlineOrdersClient) {
    console.log(".ctor: OnlineOrdersService");
    // this loads static data from a file. will replace later.

    this.loadConfirmState();
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
        loadConfirms()
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
    this.setInitialConfirm(loadConfirms());
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
    return this.client
      .apiOnlineordersPost(order)
      .pipe(map((data) => data["data"] as WorkOrder));
  }
}
