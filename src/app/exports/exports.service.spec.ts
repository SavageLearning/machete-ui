import { async, TestBed, inject } from '@angular/core/testing';

import { ExportsService } from './exports.service';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from '../in-memory-data.service';
import {ExportsOptionsComponent} from './exports-options.component';

describe('ExportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportsService],
      imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
      ]
    });
  });

  it('should ...', inject([ExportsService], (service: ExportsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get array from getList',
    async(inject([ExportsService], (service: ExportsService) => {
      service.getColumns('activities')
        .toPromise()
        .then(rows => {
          expect(rows.length).toBe(17, 'expected 17 columns from activities');
        });
    }))
  );
});
