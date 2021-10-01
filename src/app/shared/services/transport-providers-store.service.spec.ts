import { TestBed } from "@angular/core/testing";

import { TransportProvidersStoreService } from "./transport-providers-store.service";

describe("TransportProvidersStoreServiceService", () => {
  let service: TransportProvidersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportProvidersStoreService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
