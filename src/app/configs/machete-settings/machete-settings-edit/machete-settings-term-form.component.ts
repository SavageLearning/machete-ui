/* eslint-disable @typescript-eslint/unbound-method */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { debounceTime, takeWhile, tap } from "rxjs/operators";
import { OnlineOrderTerm } from "./online-order-term";

@Component({
  selector: "app-machete-settings-term-form",
  templateUrl: "./machete-settings-term-form.component.html",
  styles: [],
})
export class MacheteSettingsTermFormComponent implements OnInit, OnDestroy {
  @Output()
  public termChange = new EventEmitter<string>();
  @Input()
  public termsAsString = "";
  public termsFormArray: FormArray = new FormArray([]);
  public records: OnlineOrderTerm[] = [];
  private isAlive = true;

  constructor(private fb: FormBuilder) {}

  public onNewTerm(): void {
    this.addBlankTerm();
  }

  public onPopTerm(): void {
    this.popTerm();
  }

  private addBlankTerm(): void {
    const termForm = new FormGroup({
      name: new FormControl("", Validators.required),
      text: new FormControl("", Validators.required),
    });
    this.termsFormArray.push(termForm);
  }

  private addDefaultTerms(term: OnlineOrderTerm): void {
    const termForm = new FormGroup({
      name: new FormControl(term.name, Validators.required),
      text: new FormControl(term.text, Validators.required),
    });
    this.termsFormArray.push(termForm);
  }

  private popTerm(): void {
    this.termsFormArray.removeAt(this.termsFormArray.length - 1);
  }

  private parseTerms(termsString: string): OnlineOrderTerm[] {
    return termsString === ""
      ? []
      : (JSON.parse(termsString) as OnlineOrderTerm[]);
  }

  private clearForm(): void {
    this.termsFormArray.clear();
  }

  ngOnInit(): void {
    this.records = this.parseTerms(this.termsAsString);
    this.clearForm();
    this.records.forEach((term: OnlineOrderTerm) => {
      this.addDefaultTerms(term);
    });

    this.termsFormArray.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        debounceTime(700),
        tap((terms: OnlineOrderTerm[]) => {
          this.termChange.emit(JSON.stringify(terms));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
