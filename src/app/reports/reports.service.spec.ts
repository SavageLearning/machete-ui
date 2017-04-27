import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { SearchOptions } from './models/search-options';
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
    o.reportName = 'JobsDispatched';
    o.beginDate = new Date('01/01/2017').toLocaleDateString();
    o.endDate = new Date('03/01/2017').toLocaleDateString();
    expect(service.encodeData(o))
      .toEqual('reportName=JobsDispatched&beginDate=1%2F1%2F2017&endDate=3%2F1%2F2017');
  }));

  it('should expect rows from in-memory-web-api', async(inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    o.reportName = 'JobsDispatched';
    service.getReport(o)
      .toPromise()
      .then(rows => {
        expect(rows.data.length).toBe(27, 'should have returned expected rows');
      });
  })));
});
