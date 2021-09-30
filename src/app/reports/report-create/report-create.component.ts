import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { ReportsStoreService } from "src/app/shared/services/reports-store.service";
import { Report } from "../models/report";
import { SearchInputs } from "../models/search-inputs";

@Component({
  selector: "app-report-create",
  template: ` <!-- report create -->
    <p-dialog header="New Report" [(visible)]="showForm">
      <p-card styleClass="p-card-shadow p-mb-5">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-input-filled">
            <label for="commonName">Common name</label>
            <input
              pInputText
              id="commonName"
              [(ngModel)]="reportToCreate.commonName"
            />
          </div>
        </div>
        <ng-template pTemplate="footer">
          <div class="p-d-flex">
            <button
              pButton
              pRipple
              icon="pi pi-save"
              (click)="create()"
              label="Create Report Definition"
              class="p-mb-6 p-mt-2 p-button-raised p-ml-auto"
            ></button>
          </div>
        </ng-template>
      </p-card>
    </p-dialog>`,
  styles: [],
})
export class ReportCreateComponent implements OnDestroy {
  @Input() showForm = false;
  @Output() createdRecordEvent = new EventEmitter<Report>();
  reportToCreate: Report = new Report();
  private alive = true;

  constructor(private store: ReportsStoreService) {}
  ngOnDestroy(): void {
    this.alive = false;
  }

  create(): void {
    // simplify creation.
    this.reportToCreate.category = `New`;
    this.reportToCreate.sqlquery = `Select Count(*) as [Record Count] from WorkOrders`;
    this.reportToCreate.inputs = new SearchInputs();
    this.reportToCreate.inputs.beginDate = false;
    this.reportToCreate.inputs.endDate = false;
    this.reportToCreate.inputs.memberNumber = false;
    this.store
      .create(this.reportToCreate)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.showForm = false;
        this.createdRecordEvent.emit(res);
      });
  }
}
