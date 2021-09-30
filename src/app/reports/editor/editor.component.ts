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
export class EditorComponent {
  editorOptions = {
    theme: 'monokai',
    mode: 'text/x-mssql',
    lineNumbers: true,
    indentWithTabs: true,
    smartIndent: true,
    matchBrackets : true,
    autoCloseTags: true,
    styleActiveLine: true,
  };
  editing = false;

  @Input() sql: string;
  @Output() editedSql = new EventEmitter<string>();
  @Output() editorState = new EventEmitter<SqlEditorState>();

  doneWithSql(sql: string): void {
    this.editing = false;
    this.editorState.emit(SqlEditorState.CLOSED);
    this.editedSql.emit(sql);
  }

  startEditSql(): void {
    this.editing = true;
    this.editorState.emit(SqlEditorState.OPEN);
  }

  ngOnInit(): void {}
}
