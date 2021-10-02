import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterSpy } from "../testing";

import { TransportProvidersStoreService } from "./transport-providers-store.service";

describe("TransportProvidersStoreService", () => {
  let service: TransportProvidersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [{ provide: Router, useClass: RouterSpy }],
    });
    service = TestBed.inject(TransportProvidersStoreService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
