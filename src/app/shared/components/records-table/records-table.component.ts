import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { TransportProvider } from "src/app/online-orders/shared";
import { Column } from "src/app/workers/models/column";

@Component({
  selector: "app-records-table",
  templateUrl: "./records-table.component.html",
  styleUrls: ["./records-table.component.css"],
})
export class RecordsTableComponent implements OnInit, OnChanges {
  @Input() public values: TransportProvider[] = []; // add more types when using in other features
  @Input() public excludeCols: string[];
  @Output() public selectedRecord = new EventEmitter<TransportProvider>();
  public cols: Column[] = [];
  public record: TransportProvider;

  constructor() {}

  onRowSelect(selectedRecord: TransportProvider) {
    this.selectedRecord.emit(this.record);
  }

  private PrepareColumns(records: any, exclude: string[]) {
    // console.table(records);
    // console.log(records[0]);
    let aRecord = records[0];
    // console.log(aRecord);
    let props = Object.keys(aRecord);
    // console.log(props, "props");

    props.map((x) => {
      // console.log(x, "index");
      // console.log(aRecord[x], "proptype val");
      // console.log(!!Date.parse(aRecord[x]), "instance of date?");
      if (!!!exclude.find(name => name == x)) {
        this.cols.push(
          new Column(
            x, // field
            this.camel2title(x), // field as title
            this.getPipe(aRecord[x])
          )
        );
      }
    });
  }

  private camel2title = (camelCase: string) =>
    camelCase
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();

/**
 * Machete record table pipe assign: Only Supports the short date pipe at the moment
 */
  private getPipe(fieldValue: any) {
    return typeof fieldValue == "number"
      ? null
      : !!Date.parse(fieldValue)
      ? "shortDate"
      : null;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["values"].currentValue) {
      // console.log(changes["values"]);
      this.PrepareColumns(this.values, this.excludeCols);
    }
  }
}
