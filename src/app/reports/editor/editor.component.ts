import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SqlEditorState } from "../report-detail/report-detail.component";

export interface IEditorDetails {
  sql?: string;
  editorState: SqlEditorState;
}

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  editorOptions = { theme: "vs-dark", language: "sql" };
  editing: boolean = false;

  @Input() sql: string;
  @Output() editedSql = new EventEmitter<string>();
  @Output() editorState = new EventEmitter<SqlEditorState>();

  constructor() {}

  doneWithSql(sql: string) {
    this.editing = false;
    this.editorState.emit(SqlEditorState.CLOSED);
    this.editedSql.emit(sql);
  }

  startEditSql() {
    this.editing = true;
    this.editorState.emit(SqlEditorState.OPEN);
  }

  ngOnInit(): void {}
}
