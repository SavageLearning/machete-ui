import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../in-memory-data.service';

describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService],
      imports: [
        HttpModule
        ,InMemoryWebApiModule.forRoot(InMemoryDataService)
      ]
    });
  });

  it('should create the service', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));

  it('should pass parameters', inject([ReportsService], (service: ReportsService) => {
    expect(service.encodeData({ beginDate: '01/01/2017', endDate: '03/01/2017' }))
      .toEqual('beginDate=01%2F01%2F2017&endDate=03%2F01%2F2017');
  }));
});
