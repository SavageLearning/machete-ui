/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable curly */
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { TransportProvider } from "../index";
import * as moment from "moment/moment";

// fields is the list of controls to clear if the validator passes
export function transportAvailabilityValidator(
  rules: TransportProvider[],
  fields: string[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (rules == null) return null;
    if (control.parent == null) return null;
    const dateOfWork: Date = control.parent.get("dateOfWork").value;
    const timeOfWork: string = control.parent.get("timeOfWork").value;
    if (!dateOfWork || !timeOfWork) return null;

    const timeInMS =
      (Number(timeOfWork.split(":")[0]) * 3600 +
        Number(timeOfWork.split(":")[1]) * 60) *
      1000;
    const dateTimeofWork = new Date(dateOfWork.getTime() + timeInMS);
    const transportProviderID = control.parent.get("transportProviderID").value;
    if (!dateTimeofWork || !transportProviderID) return null;

    const provider = rules.find((f) => f.id === Number(transportProviderID));
    const day = provider.availabilityRules.find(
      (a) => a.day === moment(dateTimeofWork).day()
    );
    if (!day.available) {
      return {
        transportAvailability: `${provider.text} not available on ${moment(
          dateTimeofWork
        ).format("dddd")}.`,
      };
    }
    // clear errors on listed fields
    for (const i in fields) {
      const ctrl = control.parent.get(fields[i]);
      ctrl.setErrors(null);
    }
    return null;
  };
}
