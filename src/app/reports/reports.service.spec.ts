import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';
import { SearchOptions } from './models/search-options';
import {Report} from './models/report';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Log } from 'oidc-client';
import { environment } from '../../environments/environment';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService  ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ReportsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create the service', inject([ReportsService], (service1: ReportsService) => {
    expect(service1).toBeTruthy();
  }));

  it('should encode parameters', inject([ReportsService], (service2: ReportsService) => {
    const o = new SearchOptions();
    o.beginDate = new Date('01/01/2017').toLocaleDateString();
    o.endDate = new Date('03/01/2017').toLocaleDateString();
    expect(service2.encodeData(o))
      .toEqual('beginDate=1%2F1%2F2017&endDate=3%2F1%2F2017');
  }));

  it('should get object from getReportData when no parameters present',
    () => {
    const o = new SearchOptions();
    service.getReportData('1', o)
      .subscribe
      (res => {
        expect(typeof res).toEqual('object', 'Get w/o query doesn\'t return an object');
      });
    let req = httpMock.expectOne('http://localhost:63374/api/reports/1');
    httpMock.verify();
  });

  it('should get array from getReportData when parameters present',
    () => {
    const o = new SearchOptions();
    o.beginDate = '1/1/2016';
    o.endDate = '1/1/2017';
    service.getReportData('foobar', o)
      .subscribe(rows => {
        console.log('rows.length' + JSON.stringify(rows));
        expect(rows.length).toBe(18, 'expected 18 rows');
      });

    let req = httpMock.expectOne(baseref + '/api/reports/foobar?beginDate=1%2F1%2F2016&endDate=1%2F1%2F2017');
    httpMock.verify();

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
