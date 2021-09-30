import { Component, Input } from '@angular/core';
import { SearchInputs } from '../models/search-inputs';

@Component({
  selector: 'app-report-detail-filters-select',
  template: `
<button pButton class="p-button-info" label="'Select Filters to Display'" icon="pi pi-search" (click)="op.toggle($event)"></button>

<p-overlayPanel #op [showCloseIcon]="true" [style]="{width: '300px'}">
    <ng-template pTemplate>
    <div class="p-field-checkbox">
      <p-checkbox [(ngModel)]="inputs.beginDate" binary="true" inputId="binary"></p-checkbox>
      <label for="binary">beginDate</label>
    </div>
    <div class="p-field-checkbox">
      <p-checkbox [(ngModel)]="inputs.endDate" binary="true" inputId="binary"></p-checkbox>
      <label for="binary">endDate</label>
    </div>
    <div class="p-field-checkbox">
      <p-checkbox [(ngModel)]="inputs.memberNumber" binary="true" inputId="binary"></p-checkbox>
      <label for="binary">memberNumber</label>
    </div>
    </ng-template>
</p-overlayPanel>
  `,
  styles: [],
})

export class ReportDetailFiltersSelectComponent {
  @Input() inputs: SearchInputs;

}
