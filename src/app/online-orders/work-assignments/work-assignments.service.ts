/* eslint-disable @typescript-eslint/no-for-in-array */
import {
  zip as observableZip,
  of as observableOf,
  combineLatest as observableCombineLatest,
} from "rxjs";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { WorkAssignment } from "../../shared/models/work-assignment";

import { OnlineOrdersService } from "../online-orders.service";
import { TransportRule, TransportProvider } from "../shared/index";
import { WorkOrderService } from "../work-order/work-order.service";
import { WorkOrder } from "../../shared/models/work-order";
import { TransportRulesService } from "../transport-rules.service";
import { TransportProvidersService } from "../transport-providers.service";
import { MessageService } from "primeng/api";

@Injectable()
export class WorkAssignmentsService {
  requests: WorkAssignment[] = new Array<WorkAssignment>();
  storageKey = "machete.workassignments";

  private transports: TransportProvider[];
  private transportRules: TransportRule[];
  private combinedSource$: Observable<
    [TransportRule[], TransportProvider[], WorkOrder]
  >;
  private workOrder: WorkOrder;

  constructor(
    private onlineService: OnlineOrdersService,
    private orderService: WorkOrderService,
    private transportProviderService: TransportProvidersService,
    private transportRulesService: TransportRulesService,
    private messageService: MessageService
  ) {
    console.log(".ctor");
    const data = sessionStorage.getItem(this.storageKey);
    if (data) {
      console.log("sessionStorage:", data);
      const requests: WorkAssignment[] = JSON.parse(data) as WorkAssignment[];
      this.requests = requests;
    }
    this.combinedSource$ = observableCombineLatest([
      this.transportRulesService.getTransportRules(),
      this.transportProviderService.getTransportProviders(),
      this.orderService.getStream(),
    ]);

    this.combinedSource$.subscribe((values) => {
      console.log("combined subscription::", values);

      const [rules, transports, order] = values;
      this.workOrder = order;
      this.transportRules = rules;
      this.transports = transports;
      this.compactRequests();
    });
  }

  getStream(): Observable<WorkAssignment[]> {
    return observableOf(this.requests);
  }

  getAll(): WorkAssignment[] {
    return this.requests;
  }

  save(request: WorkAssignment): void {
    observableZip(
      this.transportRulesService.getTransportRules(),
      this.transportProviderService.getTransportProviders(),
      this.orderService.getStream()
    ).subscribe(() => {
      this._save(request);
    });
  }

  _save(request: WorkAssignment): void {
    if (request.id === 0) {
      request.id = this.getNextRequestId();
    }

    const index = this.findSelectedRequestIndex(request);
    if (index === -1) {
      this.requests.push(request); // create
    } else {
      this.requests[index] = request; // replace
    }
    this.compactRequests();
    console.log("saving:", this.requests);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.requests));
  }

  getNextRequestId(): number {
    const sorted: WorkAssignment[] = this.requests.sort(WorkAssignment.sort);
    if (sorted.length === 0) {
      return 1;
    } else {
      return sorted[sorted.length - 1].id + 1;
    }
  }

  delete(request: WorkAssignment): void {
    const index = this.findSelectedRequestIndex(request);
    if (index < 0) {
      throw new Error(
        "Can't find request (WorkAssignment) by id; failed to delete request."
      );
    }
    this.requests.splice(index, 1);
    this.compactRequests();
    console.log("saving after delete:", this.requests);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.requests));
  }

  clearState(): void {
    this.requests = new Array<WorkAssignment>();
    this.workOrder = null;
    console.log("WorkAssignmentsService.clearState-----");

    sessionStorage.removeItem(this.storageKey);
  }

  findSelectedRequestIndex(request: WorkAssignment): number {
    return this.requests.findIndex((a) => a.id === request.id);
  }

  compactRequests(): void {
    const rule = this.getTransportRule();
    if (rule == null) {
      console.log("compactRequests: rule null, skipping...");
      return;
    }
    for (const i in this.requests) {
      const newid = Number(i);
      this.requests[newid].id = newid + 1;
      this.requests[newid].transportCost = this.calculateTransportCost(
        newid + 1,
        rule
      );
      console.log("completed compactRequest");
    }
  }

  getTransportRule(): TransportRule {
    const order = this.workOrder;
    if (order == null || order === undefined) {
      console.log("OrderService returned an undefined order");
      return null;
    }
    if (
      order.transportProviderID <= 0 ||
      order.transportProviderID === undefined
    ) {
      console.log("Order missing valid transportProviderID");
      return null;
    }

    const provider: TransportProvider = this.transports.find(
      (f) => f.id === parseInt(order.transportProviderID.toString()) // force number type
    );
    if (provider == null || provider === undefined) {
      console.log(
        "LookupService didn't return a valid lookup for transportProviderID: ",
        order
      );
      return null;
    }

    const rules = this.transportRules.filter(
      (f) => f.lookupKey === provider.key
    );
    if (rules == null || rules === undefined) {
      throw new Error("No TransportRules match lookup key: " + provider.key);
    }

    const result = rules.find(
      (f) => f.zipcodes.includes(order.zipcode) || f.zipcodes.includes("*")
    );
    if (result == null || result === undefined) {
      this.messageService.add({
        severity: "warn",
        summary: `Zipcode ${order.zipcode} out of range`,
        detail: `We do not provide service to ${order.zipcode}. You may still hire, if you are willing to pick up the worker.`,
      });
      return null;
    }
    return result;
  }

  calculateTransportCost(id: number, rule: TransportRule): number {
    // can have a cost rule for a van, with an id greater that min/max worker,
    // that then leads to no rule.
    // TODO: Handle too many ids exception
    const result = rule.costRules.find(
      (r) => id > r.minWorker && id <= r.maxWorker
    );
    if (result === undefined || result == null) {
      throw new Error("work assignment id outside of cost rules");
    }
    return result.cost;
  }
}
