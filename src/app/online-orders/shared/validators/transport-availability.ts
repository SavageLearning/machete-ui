import { AbstractControl, ValidatorFn } from "@angular/forms";
import { DateTime } from "luxon";
import { TransportProvider } from "../index";

// fields is the list of controls to clear if the validator passes
export function transportAvailabilityValidator(
  rules: TransportProvider[],
  fields: string[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (rules == null) return null;
    if (control.parent == null) return null;
    const dateOfWork: Date = control.parent.get("dateOfWork").value as Date;
    const timeOfWork: string = control.parent.get("timeOfWork").value as string;
    if (!dateOfWork || !timeOfWork) return null;

    const timeInMS =
      (Number(timeOfWork.split(":")[0]) * 3600 +
        Number(timeOfWork.split(":")[1]) * 60) *
      1000;
    const dateTimeofWork = new Date(dateOfWork.getTime() + timeInMS);
    const transportProviderID = Number(
      control.parent.get("transportProviderID").value
    );
    if (!dateTimeofWork || !transportProviderID) return null;

    const provider = rules.find((f) => f.id === Number(transportProviderID));
    const day = provider.availabilityRules.find(
      (a) => a.day === dateTimeofWork.getDay()
    );
    if (!day.available) {
      return {
        transportAvailability: `${
          provider.text
        } not available on ${DateTime.fromJSDate(dateTimeofWork).toFormat(
          "cccc"
        )}.`,
      };
    }
    // clear errors on listed fields
    fields.map((field) => {
      const ctrl = control.parent.get(fields[field]);
      if (ctrl !== null) {
        ctrl.setErrors(null);
      }
    });
    return null;
  };
}
