/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { TransportProvider } from "src/app/online-orders/shared";
import { Report } from "src/app/reports/models/report";
import { Column } from "src/app/workers/models/column";

@Component({
  selector: "app-records-table",
  templateUrl: "./records-table.component.html",
  styleUrls: ["./records-table.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsTableComponent implements OnChanges {
  @Input() public values: TransportProvider[] | Report[] = []; // add more types when using in other features
  @Input() public excludeCols: string[] = [];
  @Input() public colOrder: string[] = [];
  @Output() public selectedRecord = new EventEmitter<
    TransportProvider | Report
  >();
  public cols: Column[] = [];
  public record: TransportProvider | Report;
  public maxColWidth = 0;

  onRowSelect(): void {
    this.selectedRecord.emit(this.record);
  }

  /**
   *
   * @param records Intentionally any type
   * @param exclude
   */
  private PrepareColumns(records: any, exclude: string[]): Column[] {
    const anyRecord = records[0];
    const props = Object.keys(anyRecord);

    const cols: Column[] = [];
    if (this.colOrder.length > 0) {
      props.sort((prev, current) =>
        this.colOrder.includes(prev)
          ? -1
          : this.colOrder.includes(current)
          ? 1
          : 0
      );
    }

    props.map((prop, index) => {
      // only bring in nonExcluded cols
      if (!exclude.find((name) => name == prop)) {
        cols.push(
          new Column(
            prop, // field
            this.camelToTitleCase(prop), // field as title
            this.getPipe(anyRecord[prop]),
            index
          )
        );
      }
    });
    return cols
      .slice(0) // get completely new array
      .sort((a, b) => a.index - b.index);
  }

  /**
   *
   * @param camelCase a camelCase string
   * @returns a Title Case string
   */
  private camelToTitleCase(camelCase: string): string {
    return camelCase
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  }

  /**
   * Machete record table pipe assign: Only Supports the short date pipe at the moment
   * @param fieldValue intentionally any
   * @returns
   */
  private getPipe(fieldValue: any): string {
    return typeof fieldValue == "number"
      ? null
      : Date.parse(fieldValue)
      ? "shortDate"
      : null;
  }

  private pixelWidth(word: string): number {
    const charWidth = 11;
    return word.length * charWidth + 30.56;
  }

  private getMaxColWidth(cols: Column[]): number {
    const longestHeader = cols
      .slice(0) // don't mutate
      .sort((a, b) => a.header.length - b.header.length)[
      this.cols.length - 1
    ].header;
    return this.pixelWidth(longestHeader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["values"].currentValue) {
      this.cols = this.PrepareColumns(this.values, this.excludeCols);
      this.maxColWidth = this.getMaxColWidth(this.cols);
    }
  }
}
