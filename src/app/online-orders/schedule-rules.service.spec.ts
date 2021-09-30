import { TestBed, inject } from "@angular/core/testing";

import { ScheduleRulesService } from "./schedule-rules.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("ScheduleRulesService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleRulesService],
      imports: [HttpClientModule, HttpClientTestingModule],
    })
      .compileComponents()
      .catch((e) => console.error(e));
    TestBed.inject(HttpTestingController);
  });

  it("should be created", inject(
    [ScheduleRulesService],
    (service: ScheduleRulesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
