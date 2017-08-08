import { async, TestBed, inject } from '@angular/core/testing';

import { ExportsService } from './exports.service';
import {HttpModule} from '@angular/http';
import {ExportsOptionsComponent} from './exports-options.component';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

describe('ExportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportsService, HttpClient, HttpHandler],
      imports: [
        HttpModule
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
