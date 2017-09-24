import { Component, OnInit } from '@angular/core';
import { EmployersService } from './employers.service';
import { Employer } from '../shared/models/employer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookupsService } from '../lookups/lookups.service';
import { MySelectItem } from "../shared/models/my-select-item";


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css'],
  providers: [ EmployersService, LookupsService ]
})
export class EmployersComponent implements OnInit {
  employer: Employer = new Employer();
  employerForm: FormGroup;
  showErrors = false;
  yesNoDropDown = [new MySelectItem('no', 'false'), 
    new MySelectItem('yes', 'true')];
  formErrors = {
    'address1': '',
    'address2': '',
    'blogparticipate?': '',
    'business': '',
    'businessname': '',
    'cellphone': '',
    'city': '',
    'email': '',
    'fax': '',
    'name': '',
    'phone': '',
    'referredBy': '',
    'referredByOther': '',
    'state': '',
    'zipcode': ''
  };

  validationMessages = {
    'address1': { 'required': 'Address is required' },
    'address2': { },
    'blogparticipate': { },
    'business': { },
    'businessname': { },
    'cellphone': { },
    'city': { 'required': 'City is required' },
    'email': { 'required': 'Email is required' },
    'fax': { 'required': '' },
    'name': { 'required': 'Name is required' },
    'phone': { 'required': 'Phonr is required' },
    'referredBy': { },
    'referredByOther': { },
    'state': { 'required': 'State is required' },
    'zipcode': { 'required': 'zipcode is required' }
  };

  constructor(
    private employersService: EmployersService,
    private lookupsService: LookupsService,
     private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.employersService.getEmployerBySubject()
      .subscribe(
        data => {
          this.employer = data || new Employer();
          this.buildForm();
        });
    this.buildForm();
  }

  buildForm(): void {
    this.employerForm = this.fb.group({
    'id': [this.employer.id],
    'address1': [this.employer.address1, Validators.required],
    'address2': [this.employer.address2],
    'blogparticipate': [this.employer.blogparticipate],
    'business': [this.employer.business],
    'businessname': [this.employer.businessname],
    'cellphone': [this.employer.cellphone],
    'city': [this.employer.city, Validators.required],
    'email': [this.employer.email, Validators.required],
    'fax': [this.employer.fax],
    'name': [this.employer.name, Validators.required],
    'phone': [this.employer.phone, Validators.required],
    'referredBy': [this.employer.referredBy],
    'referredByOther': [this.employer.referredByOther],
    'state': [this.employer.state, Validators.required],
    'zipcode': [this.employer.zipcode, Validators.required]
    });

    this.employerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.employerForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  saveEmployer() {
    console.log('saveEmployer: called');
    this.onValueChanged();
    if (this.employerForm.status === 'INVALID') {
      this.showErrors = true;
      return;
    }
    console.log('saveEmployer: valid');

    this.showErrors = false;
    const formModel = this.employerForm.value;

    this.employersService.save(formModel)
      .subscribe(
        data => {},
        //   this.employer = data;
        //   this.buildForm();
        // },
        error => {
          console.error(error);
        }
      );
  }

}
