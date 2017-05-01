import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { SearchOptions } from './models/search-options';
import {Report} from './models/report';
describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService],
      imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
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

  it('should get object from in-memory-web-api when no parameters present', async(inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    service.getReport('1', o)
      .toPromise()
      .then(res => {
        expect(typeof res).toEqual('object', 'Get w/o query doesn\'t return an object');
      });
  })));

  it('should get array from in-memory-web-api when parameters present', async(inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    o.beginDate = '1/1/2016';
    o.endDate = '1/1/2017';
    service.getReport('1', o)
      .toPromise()
      .then(rows => {
        expect(rows.length).toBe(18, 'expected 18 rows');
      });
  })));
});
