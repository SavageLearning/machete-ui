import {
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { TransportProvider, TransportProviderAvailability } from "..";
import { transportAvailabilityValidator } from "./transport-availability";
import { DateTime } from "luxon";

describe("TransportAvailability", () => {
  let ctrl: AbstractControl;
  let fb: FormBuilder;
  let fg: FormGroup;
  let tFunc: ValidatorFn;
  beforeEach(() => {
    fb = new FormBuilder();
    tFunc = transportAvailabilityValidator(
      new Array<TransportProvider>(
        new TransportProvider({
          id: 1,
          key: "",
          text: "transport_van",
          defaultAttribute: true,
          sortorder: 1,
          active: true,
          availabilityRules: new Array<TransportProviderAvailability>(
            new TransportProviderAvailability({ day: 0, available: false }),
            new TransportProviderAvailability({ day: 1, available: true }),
            new TransportProviderAvailability({ day: 2, available: true }),
            new TransportProviderAvailability({ day: 3, available: true }),
            new TransportProviderAvailability({ day: 4, available: true }),
            new TransportProviderAvailability({ day: 5, available: true }),
            new TransportProviderAvailability({ day: 6, available: true })
          ),
        })
      ),
      ["dateOfWork"]
    );
  });

  it("should create an instance", () => {
    const date: Date = DateTime.local().set({ weekday: 1 }).toJSDate();
    const time: string = DateTime.local().set({ hour: 0 }).toISOTime();
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1,
    });
    ctrl = fg.get("dateOfWork");
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });

  it("should not show van on Sunday", () => {
    const date: Date = DateTime.local().set({ weekday: 7 }).toJSDate();
    const time: string = DateTime.local()
      .set({ hour: 0, minute: 0 })
      .toISOTime();
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1,
    });

    ctrl = fg.get("dateOfWork");
    const result = tFunc(ctrl);
    expect(result.transportAvailability).toBe(
      "transport_van not available on Sunday."
    );
  });
});
