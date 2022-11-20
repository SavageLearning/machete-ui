/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, fromEvent } from "rxjs";
import { Lookup } from "../../shared/models/lookup";
import { Worker } from "../../shared/models/worker";
import { LookupsService } from "../../lookups/lookups.service";
import { WorkersService } from "../workers.service";
import { ApiRequestParams } from "../models/api-request-params";
import { ApiResponse } from "../models/api-response";
import { Column } from "../models/column";
import { LazyLoadEvent } from "primeng//api/lazyloadevent";
import { debounceTime, delay, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "app-workers-in-skill",
  templateUrl: "./workers-in-skill.component.html",
  styleUrls: ["./workers-in-skill.component.css"],
})
export class WorkersInSkillComponent implements OnInit, AfterViewInit {
  private endpointQueryParam: number;

  // workers list
  workers: Worker[] = [];
  skill: Lookup;
  // filter fields
  cols: Column[] = [
    new Column("firstname1", "First Name(1)", null),
    new Column("firstname2", "First Name(2)", null),
    new Column("lastname1", "Last Name(1)", null),
    new Column("lastname2", "Last Name(2)", null),
    new Column("dwccardnum", "Member #", null),
    new Column("memberexpirationdate", "Expires", "shortDate"),
    new Column("memberStatusEN", "Status", null),
    new Column("driverslicense", "Driver's License", null),
    new Column("carinsurance", "Auto Insurance", null),
    new Column("dateupdated", "Updated", "M/d/yy h:mm a"),
    new Column("skillCodes", "Skills Code", null),
    new Column("zipCode", "Zip", null),
  ];
  // pagination
  loading: boolean;
  reqParams = new ApiRequestParams(); // api request model
  workersInSkillRes: ApiResponse<Worker>; // api response model
  // View queries
  @ViewChild("input") input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkersService,
    private lookupsService: LookupsService,
    private cd: ChangeDetectorRef
  ) {}

  private initializeSearchSubscription() {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        delay(0),
        tap(() => {
          this.loading = true;
          this.reqParams.pageNumber = 1; // clear pagination pointer
          this.reqParams.search =
            (this.input.nativeElement.value as string) === ""
              ? undefined
              : (this.input.nativeElement.value as string);
          console.log(this.input.nativeElement.value);
          this.loadServiceData(this.endpointQueryParam);
        })
      )
      .subscribe();
  }

  private loadServiceData(skillId: number) {
    console.table(this.reqParams);
    // const workersInSkill$ = this.workerService.getWorkersInSkill(
    //   skillId,
    //   this.reqParams
    // );
    const lookups$ = this.lookupsService.getLookup(skillId);

    // combineLatest([workersInSkill$, lookups$]).subscribe(
    //   // success
    //   (response: [ApiResponse<Worker>, Lookup]) => {
    //     const [workersInSkillRes, lookupsRes] = response;
    //     // worker
    //     this.initializeTable(workersInSkillRes);
    //     // Lookup
    //     this.skill = lookupsRes;
    //   },
    //   //error
    //   (err) => console.log(err)
    // );
  }

  private initializeTable(res: ApiResponse<Worker>) {
    this.workersInSkillRes = res;
    this.workers = this.workersInSkillRes.data;
    console.table(this.workers);
    this.loading = false;
  }

  private initializeRequestParams() {
    this.reqParams.pageSize = 10;
    this.reqParams.pageNumber = 1;
  }

  loadNextPage(e: LazyLoadEvent): void {
    this.loading = true;
    this.reqParams.pageSize = e.rows;
    this.reqParams.pageNumber =
      e.first == 0 ? e.first + 1 : e.first / e.rows + 1;
    if (e.sortField) {
      this.reqParams.sortField = e.sortField;
    }
    switch (e.sortOrder) {
      case -1:
        this.reqParams.sortDesc = true;
        break;
      case 1:
        this.reqParams.sortDesc = false;
        break;
      default:
        this.reqParams.sortDesc = null;
    }
    // Api call
    this.loadServiceData(this.endpointQueryParam);
    console.log(this.reqParams, "reqparams");
    // Update the table
    setTimeout(() => {
      if (this.workers) {
        this.workers.slice(e.first, e.first + e.rows);
      }
    }, 1000);
  }

  // Lifecycle
  ngOnInit(): void {
    this.endpointQueryParam = Number(this.route.snapshot.paramMap.get("id"));
    this.initializeRequestParams();
    this.loadServiceData(this.endpointQueryParam);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges(); // Angular view verification loop
    this.initializeSearchSubscription();
  }
}
