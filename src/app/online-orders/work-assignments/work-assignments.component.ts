/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { combineLatest as observableCombineLatest, Observable } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { WorkAssignment } from "../../shared/models/work-assignment";
import { LookupsService } from "../../lookups/lookups.service";
import { Lookup, LCategory } from "../../shared/models/lookup";
import { OnlineOrdersService } from "../online-orders.service";
import { WorkAssignmentsService } from "./work-assignments.service";
import { TransportRule, requiredValidator, TransportProvider } from "../shared";
import { MySelectItem } from "../../shared/models/my-select-item";
import { hoursValidator } from "../shared/validators/hours";
import { TransportRulesService } from "../transport-rules.service";
import { SkillRule } from "../shared/models/skill-rule";
import { TransportProvidersService } from "../transport-providers.service";
import { lengthValidator } from "../../shared/validators/length";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { SkillsComponent } from "./skills/skills.component";

enum MessageTypes {
  ToastSkillSelection = "ToastSkillSelection",
  SuccessSkillSaved = "SuccessSkillSaved",
}

@Component({
  selector: "app-work-assignments",
  templateUrl: "./work-assignments.component.html",
  styleUrls: ["./work-assignments.component.css"],
})
export class WorkAssignmentsComponent implements OnInit, OnDestroy {
  // public properties
  activeTabIndex = 0;
  eMessages = MessageTypes;
  errorMessage: string;
  formErrors = {
    skillId: "",
    skill: "",
    hours: "",
    description: "",
    requiresHeavyLifting: "",
    hourlyWage: "",
  };
  hasRequests = false;
  newRequest = true;
  ref: DynamicDialogRef;
  request: WorkAssignment = new WorkAssignment(); // composed by UI to make/edit a request
  requestForm: FormGroup;
  requestList: WorkAssignment[] = new Array<WorkAssignment>(); // list built by user in UI
  selectedRequest: WorkAssignment;
  selectedSkill: Lookup = new Lookup();
  showErrors = false;
  skillsDropDown: MySelectItem[];
  skills: Lookup[]; // Lookups from Lookups Service
  skillsRules: SkillRule[];
  transportRules: TransportRule[];
  transports: TransportProvider[];

  // private fields
  private combinedSource: Observable<
    [TransportRule[], Lookup[], TransportProvider[]]
  >;

  constructor(
    private lookupsService: LookupsService,
    private transportProviderService: TransportProvidersService,
    private waService: WorkAssignmentsService,
    private onlineService: OnlineOrdersService,
    private transportRulesService: TransportRulesService,
    private router: Router,
    private fb: FormBuilder,
    public dialogService: DialogService,
    private messageServ: MessageService
  ) {
    console.log(".ctor");
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    // waService.transportRules could fail under race conditions

    this.combinedSource = observableCombineLatest([
      this.transportRulesService.getTransportRules(),
      this.lookupsService.getLookups(LCategory.SKILL),
      this.transportProviderService.getTransportProviders(),
    ]);

    this.combinedSource.subscribe((values) => {
      const [rules, skills, transports] = values;
      //
      this.transportRules = rules;
      //
      this.skills = skills;
      this.skillsDropDown = skills.map(
        (l) => new MySelectItem(l.text_EN, String(l.id))
      );
      this.skillsRules = skills.map((l) => new SkillRule(l));
      //
      this.transports = transports;
      this.buildForm();
    });
    // this.transportRulesService.getTransportRules()
    //   .subscribe(
    //     data => this.transportRules = data,
    //     // When this leads to a REST call, compactRequests will depend on it
    //     error => console.error('ngOnInit.getTransportRules.error' + error),
    //     () => console.log('ngOnInit:getTransportRules onCompleted'));

    // this.lookupsService.getLookups(LCategory.SKILL)
    //   .subscribe(
    //     listData => {
    //       this.skills = listData;
    //       this.skillsDropDown = listData.map(l =>
    //         new MySelectItem(l.text_EN, String(l.id)));
    //       this.skillsRules = listData.map(l => new SkillRule(l));
    //       console.log(this.skillsRules);
    //     },
    //     error => this.errorMessage = <any>error,
    //     () => console.log('ngOnInit:skills onCompleted'));
    // this.transportProviderService.getTransportProviders()
    //   .subscribe(
    //     data =>  this.transports = data,
    //     error => this.errorMessage = <any>error,
    //     () => console.log('ngOnInit:transports onCompleted'));
    this.requestList = this.waService.getAll();
    this.setHasRequests();
    this.buildForm();
  }

  // public methods
  buildForm(): void {
    this.requestForm = this.fb.group({
      id: "",
      skillId: [
        "",
        requiredValidator("Please select the type of work to be performed."),
      ],
      skill: [""],
      hours: ["", hoursValidator(this.skillsRules, this.skills, "skillId")],
      description: ["", lengthValidator(1000)], // !! Todo: should be provided by API
      requiresHeavyLifting: [false],
      hourlyWage: [""],
    });

    this.requestForm.valueChanges.subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }
  setHasRequests(): void {
    if (this.requestList.length > 0) {
      this.hasRequests = true;
    } else {
      this.hasRequests = false;
    }
  }
  onValueChanged(): void {
    const form = this.requestForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = "";
      const control = form.get(field);

      if (control && !control.valid) {
        for (const key in control.errors) {
          console.log(
            `onValueChanged.error: ${field} : ${control.errors[key]}`
          );
          this.formErrors[field] += `${control.errors[key]} `;
        }
      }
    }
  }

  selectSkill(skillId: number): void {
    console.log("selectSkill.skillId:" + String(skillId));
    const skill = this.skills.filter((f) => f.id === Number(skillId)).shift();
    if (skill == null || skill === undefined) {
      throw new Error("Can't find selected skill in component's list");
    }
    this.selectedSkill = skill;
    this.requestForm.controls["skillId"].setValue(skill.id);
    this.requestForm.controls["skill"].setValue(skill.text_EN);
    this.requestForm.controls["hourlyWage"].setValue(skill.wage);
  }

  onAddJobsToRequest(): void {
    if (this.requestForm.valid && this.requestForm.touched) {
      this.activeTabIndex = 1;
    }
  }

  onAddMoreJobs(): void {
    this.activeTabIndex = 0;
    this.clearMessages(this.eMessages.SuccessSkillSaved);
    this.requestForm.reset();
    this.selectedSkill = new Lookup();
    this.buildForm();
    this.newRequest = true;
  }

  onShowSkillsCart(): void {
    this.ref = this.dialogService.open(SkillsComponent, {
      data: this.skills,
      header: "Choose a Skill",
      width: "100%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
    });

    // called from the child component (skills)
    this.ref.onClose.subscribe((skill: Lookup) => {
      if (skill) {
        this.selectSkill(skill.id);
        this.messageServ.add({
          life: 4000,
          key: this.eMessages.ToastSkillSelection,
          severity: "success",
          summary: `${skill.text_EN} selected`,
          detail: "Choose additional details to continue",
        });
      }
    });
  }

  clearMessages(key: MessageTypes): void {
    this.messageServ.clear(key);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  // loads an existing item into the form fields
  editRequest(request: WorkAssignment): void {
    this.activeTabIndex = 0;
    this.requestForm.controls["id"].setValue(request.id);
    this.requestForm.controls["skillId"].setValue(request.skillId);
    this.requestForm.controls["skill"].setValue(request.skill);
    this.requestForm.controls["hours"].setValue(request.hours);
    this.requestForm.controls["description"].setValue(request.description);
    this.requestForm.controls["requiresHeavyLifting"].setValue(
      request.requiresHeavyLifting
    );
    this.requestForm.controls["hourlyWage"].setValue(request.hourlyWage);
    this.selectSkill(request.skillId);
    this.newRequest = false;
  }

  deleteRequest(request: WorkAssignment): void {
    this.waService.delete(request);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.newRequest = true;
    if (this.requestList == null || this.requestList.length === 0) {
      this.onlineService.setWorkAssignmentsConfirm(false);
    }
    this.setHasRequests();
  }

  saveRequest(): void {
    this.onValueChanged();
    if (this.requestForm.status === "INVALID") {
      this.showErrors = true;
      //this.onlineService.setWorkAssignmentsConfirm(false);
      return;
    }
    this.showErrors = false;
    const formModel: WorkAssignment = this.requestForm.value;

    const saveRequest: WorkAssignment = {
      id: formModel.id || 0,
      skillId: formModel.skillId,
      skill: formModel.skill,
      hours: formModel.hours,
      description: formModel.description,
      requiresHeavyLifting: formModel.requiresHeavyLifting,
      hourlyWage: formModel.hourlyWage,
      transportCost: 0,
      days: 1, // We currently only support 1 day on employer portal
    };

    this.clearMessages(this.eMessages.SuccessSkillSaved);
    this.waService.save(saveRequest);
    if (!this.newRequest) {
      //save message
      this.messageServ.add({
        severity: "success",
        key: this.eMessages.SuccessSkillSaved,
        summary: `Job saved!`,
      });
    } else {
      //create message
      this.messageServ.add({
        severity: "success",
        key: this.eMessages.SuccessSkillSaved,
        summary: `Success!`,
        detail: `Job added successfully to your resquest. See details below`,
      });
    }
    this.onlineService.setWorkAssignmentsConfirm(true);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.selectedSkill = new Lookup();
    this.buildForm();
    this.newRequest = true;
    this.setHasRequests();
  }

  onRowSelect(event: { data: any }): void {
    this.newRequest = false;
    this.request = this.cloneRequest(event.data);
  }

  cloneRequest(c: WorkAssignment): WorkAssignment {
    const request = new WorkAssignment();
    for (const prop in c) {
      request[prop] = c[prop];
    }
    return request;
  }

  finalize(): void {
    this.router
      .navigate(["/online-orders/order-confirm"])
      .catch((e) => console.error(e));
  }
}
