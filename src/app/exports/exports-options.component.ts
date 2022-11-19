import { Component, Input } from "@angular/core";
import { ExportColumn } from "../shared/models/export-column";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-exports-options",
  templateUrl: "./exports-options.component.html",
  styleUrls: ["./exports-options.component.css"],
})
export class ExportsOptionsComponent {
  @Input() columns: ExportColumn[] = [];
  @Input() form: FormGroup;
  checked: true;
  // constructor() { }
}
