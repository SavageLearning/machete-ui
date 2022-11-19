import { TestBed, inject } from "@angular/core/testing";
import { ReportsService } from "./reports.service";
import { SearchOptions } from "./models/search-options";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { Router } from "@angular/router";
import { RouterSpy } from "../shared/testing";

describe("ReportsService", () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService, { provide: Router, useClass: RouterSpy }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should create the service", inject(
    [ReportsService],
    (service1: ReportsService) => {
      expect(service1).toBeTruthy();
    }
  ));

  it("should get object from getReportData when no parameters present", (done) => {
    const o = new SearchOptions();
    service.getReportData("1", o).subscribe((res) => {
      expect(typeof res).toEqual(
        "object",
        "Get w/o query doesn't return an object"
      );
    });
    httpMock.expectOne("http://localhost/api/reports");
    httpMock.expectOne("http://localhost/api/reports/1"); // 'https://test-api.machetessl.org/api/reports/1');
    httpMock.verify();
    done();
  });

  it("should get array from getReportData when parameters present", (done) => {
    const o = new SearchOptions();
    o.beginDate = "1/1/2016";
    o.endDate = "1/1/2017";
    service.getReportData("foobar", o).subscribe((rows) => {
      expect(rows.length).toBe(18, "expected 18 rows");
    });

    //let req = httpMock.expectOne('https://test-api.machetessl.org/api/reports/foobar?beginDate=1%2F1%2F2016&endDate=1%2F1%2F2017');
    httpMock.expectOne(
      "http://localhost/api/reports/foobar?beginDate=1%2F1%2F2016&endDate=1%2F1%2F2017"
    );
    httpMock.expectOne("http://localhost/api/reports");

    httpMock.verify();
    done();
  });

  // it('should get array from getList',
  //   async(inject([ReportsService], (service: ReportsService) => {
  //     service.subscribeToDataService()
  //       .delay(1000)
  //       .toPromise()
  //       .then((rows) => {
  //         expect(rows.length).toBe(4, 'expected 3 report definitions');
  //       });
  //     service.getReportList();

  //   }))
  // );
});
