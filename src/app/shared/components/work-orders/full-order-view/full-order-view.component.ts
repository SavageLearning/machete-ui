import { Component, Input, OnChanges } from "@angular/core";
import { WorkOrder } from "../../../models/work-order";
import { MessageService } from "primeng/api";

interface EmployerInfo {
  name: string;
  worksite1: string;
  worksite2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface JobDetails {
  description: string;
  englishRequired: string;
  tranportMethod: string;
  workerCount: number;
}

interface OrderCost {
  feeName: string;
  feeId: string;
  fee: number;
  due: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "full-order-view",
  templateUrl: "./full-order-view.component.html",
  styleUrls: ["./full-order-view.component.css"],
})
export class FullOrderViewComponent implements OnChanges {
  @Input() order: WorkOrder;
  @Input() transportLabel: string;
  @Input() workerCount: number;
  @Input() transportCost: number;
  @Input() laborCost: number;
  @Input() showPayPal: boolean;

  employerInfo: EmployerInfo;
  jobInfo: JobDetails[] = new Array<JobDetails>();
  orderCost: OrderCost[] = new Array<OrderCost>();

  constructor(private messageService: MessageService) {
    console.log(".ctor");
  }

  ngOnChanges(): void {
    if (
      this.showPayPal &&
      this.transportCost > 0 &&
      this.order.ppState !== "created"
    ) {
      const detail =
        'Please pay the transport costs by PayPal or Credit Card by clicking on "PayPal Checkout"';
      this.messageService.add({
        severity: "warn",
        summary: "Transport costs due",
        detail,
      });
    }
    this.employerInfo = {
      name: this.order.contactName,
      worksite1: this.order.workSiteAddress1,
      worksite2: this.order.workSiteAddress2,
      city: this.order.city,
      state: this.order.state,
      zip: this.order.zipcode,
      phone: this.order.phone,
    };
    this.jobInfo = [
      {
        description: this.order.description,
        englishRequired: this.order.englishRequired ? "yes" : "no",
        tranportMethod: this.transportLabel,
        workerCount: this.workerCount,
      },
    ];
    this.orderCost = [
      {
        feeName: "Transport Cost",
        feeId: "transport_cost",
        fee: this.transportCost,
        due: "Due now and payable with Paypal, debit or credit",
      },
      {
        feeName: "Labor Cost",
        feeId: "labor_cost",
        fee: this.laborCost,
        due: "To be paid directly to workers in cash at the end of the work day",
      },
    ];
  }
}
