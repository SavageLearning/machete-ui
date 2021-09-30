import { TestBed, inject } from "@angular/core/testing";

import { TransportRulesService } from "./transport-rules.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";

describe("TransportRulesService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportRulesService],
      imports: [HttpClientModule, HttpClientTestingModule],
    })
      .compileComponents()
      .catch((e) => console.error(e));
    TestBed.inject(HttpTestingController);
  });

  it("should be created", inject(
    [TransportRulesService],
    (service: TransportRulesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
