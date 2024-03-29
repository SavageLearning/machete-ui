import { Component, OnInit } from "@angular/core";
import { EmployersService } from "./employers.service";
import { Employer } from "../shared/models/employer";
import { FormGroup, FormBuilder } from "@angular/forms";
import { YesNoSelectItem } from "../shared/models/my-select-item";
import { Router } from "@angular/router";
import { requiredValidator } from "../online-orders/shared/index";
import {
  phoneValidator,
  phoneOrEmptyValidator,
} from "../shared/validators/phone";
import { regexValidator } from "../shared/validators/regex";
import { lengthValidator } from "../shared/validators/length";

@Component({
  selector: "app-employers",
  templateUrl: "./employers.component.html",
  styleUrls: ["./employers.component.css"],
  providers: [],
})
export class EmployersComponent implements OnInit {
  employer: Employer = new Employer();
  employerForm: FormGroup;
  showFormErrors = false;
  saveDisabled = false;
  errorMessage = "";
  yesNoDropDown = [
    new YesNoSelectItem("no", false),
    new YesNoSelectItem("yes", true),
  ];
  formErrors = {
    address1: "",
    address2: "",
    "blogparticipate?": "",
    business: "",
    businessname: "",
    cellphone: "",
    city: "",
    email: "",
    fax: "",
    name: "",
    phone: "",
    referredBy: "",
    referredByOther: "",
    state: "",
    zipcode: "",
  };

  constructor(
    private employersService: EmployersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.saveDisabled = false;
    this.buildForm();
    this.employersService.getEmployer().subscribe((data) => {
      this.employer = data || new Employer();
      this.buildForm();
    });
  }

  buildForm(): void {
    this.employerForm = this.formBuilder.group({
      //'id': [this.employer.id],
      address1: [
        this.employer.address1,
        [requiredValidator("Address is required"), lengthValidator(50)],
      ],
      address2: [this.employer.address2, lengthValidator(50)],
      blogparticipate: [this.employer.blogparticipate],
      business: [this.employer.business],
      businessname: [this.employer.businessname],
      cellphone: [
        this.employer.cellphone,
        phoneOrEmptyValidator(
          "Cell is optional, but requires ###-###-#### format"
        ),
      ],
      city: [
        this.employer.city,
        [requiredValidator("City is required"), lengthValidator(50)],
      ],
      email: [
        { value: this.employer.email, disabled: true },
        requiredValidator("Email is required"),
      ],
      fax: [this.employer.fax],
      name: [
        this.employer.name,
        [requiredValidator("Name is required"), lengthValidator(50)],
      ],
      phone: [
        this.employer.phone,
        phoneValidator("Phone is required in 999-999-9999 format"),
      ],
      referredBy: [this.employer.referredBy],
      referredByOther: [this.employer.referredByOther, lengthValidator(50)],
      state: [
        this.employer.state,
        [
          requiredValidator("State is required"),
          regexValidator(
            new RegExp(/^[a-zA-Z]{2,2}$/),
            "state",
            "State must be two letters"
          ),
        ],
      ],
      zipcode: [
        this.employer.zipcode,
        [requiredValidator("zipcode is required"), lengthValidator(10)],
      ],
    });

    this.employerForm.valueChanges.subscribe(() => this.onValueChanged());

    this.onValueChanged();
  }

  onValueChanged(): void {
    const form = this.employerForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = "";
      const control = form.get(field);

      if (control && !control.valid) {
        for (const key in control.errors) {
          const errMessage = control.errors[key] as string;
          if (this.showFormErrors === true) {
            console.error(`onValueChanged.error:  ${field}: ${errMessage}`);
          }
          this.formErrors[field] += `${errMessage} `;
        }
      }
    }
  }

  saveEmployer(): void {
    console.log("saveEmployer: called");
    this.onValueChanged();
    if (this.employerForm.status === "INVALID") {
      console.error("error!");
      this.showFormErrors = true;
      return;
    }
    console.log("saveEmployer: form status valid");
    this.saveDisabled = true;
    this.showFormErrors = false;
    const formModel = this.employerForm.value as Employer;
    this.employersService.save(formModel).subscribe(
      (data) => {
        console.log("employerService.save returned:", data);
        this.saveDisabled = false;
        this.router
          .navigate(["/online-orders/introduction"])
          .catch((e) => console.error(e));
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
