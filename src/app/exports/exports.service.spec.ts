import { async, TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ExportsService } from './exports.service';
import {ExportsOptionsComponent} from './exports-options.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ExportsService', () => {
  let service: ExportsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportsService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ExportsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([ExportsService], (service1: ExportsService) => {
    expect(service1).toBeTruthy();
  }));

  it('should catch error from response',
      () => {
        service.getColumns('activities')
          .subscribe((res: any) => {
            expect(res.name).toBe('HttpErrorResponse');
          });
        let req = httpMock.expectOne('http://localhost:63374/api/exports/activities');
        req.error(new ErrorEvent('foo'));
        httpMock.verify();
    });

  it('should populate the export list',
    async(inject([ExportsService], (service2: ExportsService) => {
      service2.getExportsList()
        .toPromise()
        .then(rows => {
          expect(rows.length).toBe(2, 'expected 2 in exports list');
        });
    }))
  );
});
