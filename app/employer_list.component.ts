import { Component } from '@angular/core';
import {Employer} from "./models/employer";
import {EmployerService} from "./services/employer.service";

@Component({
  selector: 'employer-list',
  templateUrl: 'app/employer_list.component.html'
})
export class EmployerListComponent {

  displayDialog: boolean;

  employer: Employer = new PrimeEmployer();

  selectedEmployer: Employer;

  newEmployer: boolean;

  employers: Employer[];

  constructor(private employerService: EmployerService) { }

  ngOnInit() {
    this.employerService.getEmployers()
      .then(employers => this.employers = employers);
  }

  showDialogToAdd() {
    this.newEmployer = true;
    this.employer = new PrimeEmployer();
    this.displayDialog = true;
  }

  save() {
    if(this.newEmployer)
      this.employers.push(this.employer);
    else
      this.employers[this.findSelectedEmployerIndex()] = this.employer;

    this.employer = null;
    this.displayDialog = false;
  }

  delete() {
    this.employers.splice(this.findSelectedEmployerIndex(), 1);
    this.employer = null;
    this.displayDialog = false;
  }

  onRowSelect(event: any) {
    this.newEmployer = false;
    this.employer = this.cloneEmployer(event.data);
    this.displayDialog = true;
  }

  cloneEmployer(c: Employer): Employer {
    let employer = new PrimeEmployer();
    for(let prop in c) {
      employer[prop] = c[prop];
    }
    return employer;
  }

  findSelectedEmployerIndex(): number {
    return this.employers.indexOf(this.selectedEmployer);
  }
}

class PrimeEmployer implements Employer {
  constructor(
    public ID?: number,
    public active?: boolean,
    public business?: boolean,
    public name?: string,
    public address1?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public phone?: string,
    public cellPhone?: string,
    public zipCode?: string,
    public email?: string,
    public referralType_EN?: string,
    public referredByOther?: string,
    public blogParticipate?: boolean,
    public notes?: string,
    public onlineSource?: boolean,
    public returnCustomer?: boolean,
    public receiveUpdates?: boolean,
    public businessName?: string,
    public licensePlate?: string,
    public driversLicense?: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public createdBy?: string,
    public updatedBy?: string
) { }
}
