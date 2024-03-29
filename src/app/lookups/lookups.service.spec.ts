import { TestBed, inject } from "@angular/core/testing";

import { LookupsService } from "./lookups.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Lookup, LCategory } from "../shared/models/lookup";

describe("LookupsService", () => {
  let service: LookupsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupsService],
      imports: [HttpClientTestingModule],
    });
    sessionStorage.removeItem("machete.lookups");
    sessionStorage.removeItem("machete.lookups.age");
    service = TestBed.inject(LookupsService);
  });

  it("should ...", inject([LookupsService], (service1: LookupsService) => {
    expect(service1).toBeTruthy();
  }));

  it("getLookups should return 1 injected Lookup record", () => {
    const testdata = new Array<Lookup>();
    testdata.push(new Lookup({ category: LCategory.SKILL }));
    testdata.push(new Lookup({ category: LCategory.TRANSPORT }));
    service.lookupsSource.next(testdata);

    service.getLookups(LCategory.SKILL).subscribe((rows) => {
      expect(rows.length).toBe(1, "expected 1 lookups");
      expect(rows[0].idString).toBe("Lookup", "expected typeof Lookup");
    });
  });

  it("getLookup should return 1 injected Lookup record", () => {
    const testdata = new Array<Lookup>();
    testdata.push(new Lookup({ id: 1 }));
    testdata.push(new Lookup({ id: 2 }));
    testdata.push(new Lookup({ id: 3 }));
    service.lookupsSource.next(testdata);

    service.getLookup(2).subscribe((lookup) => {
      expect(lookup.id).toBe(2, "expected lookup with id=2");
      expect(lookup.idString).toBe("Lookup", "expected typeof Lookup");
    });
  });
});
