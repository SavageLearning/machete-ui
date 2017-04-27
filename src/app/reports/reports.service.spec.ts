import { TestBed, inject } from '@angular/core/testing';
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

  it('should pass parameters', inject([ReportsService], (service: ReportsService) => {
    const o = new SearchOptions();
    o.beginDate = new Date('01/01/2017').toLocaleDateString();
    o.endDate = new Date('03/01/2017').toLocaleDateString();
    expect(service.encodeData(o))
      .toEqual('beginDate=1%2F1%2F2017&endDate=3%2F1%2F2017');
  }));
});
