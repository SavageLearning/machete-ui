import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';
import { SearchOptions } from './models/search-options';
import {Report} from './models/report';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService, HttpClient, HttpHandler],
      imports: [
        HttpModule
      ]
    });
  });

  it('should create the service', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));

  it('should encode parameters', inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    o.beginDate = new Date('01/01/2017').toLocaleDateString();
    o.endDate = new Date('03/01/2017').toLocaleDateString();
    expect(service.encodeData(o))
      .toEqual('beginDate=1%2F1%2F2017&endDate=3%2F1%2F2017');
  }));

  it('should get object from getReportData when no parameters present', async(inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    service.getReportData('1', o)
      .toPromise()
      .then(res => {
        expect(typeof res).toEqual('object', 'Get w/o query doesn\'t return an object');
      });
  })));

  it('should get array from getReportData when parameters present',
    async(inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    o.beginDate = '1/1/2016';
    o.endDate = '1/1/2017';
    service.getReportData('1', o)
      .toPromise()
      .then(rows => {
        expect(rows.length).toBe(18, 'expected 18 rows');
      });
  })));

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
