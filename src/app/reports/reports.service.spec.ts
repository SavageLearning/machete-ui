import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should create the service', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));
});
