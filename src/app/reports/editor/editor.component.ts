import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SqlEditorState } from '../report-detail/report-detail.component';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/selection/active-line';

export interface IEditorDetails {
  sql?: string;
  editorState: SqlEditorState;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  editorOptions = {
    theme: "monokai",
    mode: "text/x-mssql",
    lineNumbers: true,
    indentWithTabs: true,
    smartIndent: true,
    matchBrackets: true,
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

  // ngOnInit(): void {}
}
