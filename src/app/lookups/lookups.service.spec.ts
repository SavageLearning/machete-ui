import { TestBed, inject } from '@angular/core/testing';

import { LookupsService } from './lookups.service';
import { environment } from '../../environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LookupsService', () => {
  let service: LookupsService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupsService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(LookupsService);
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should ...', inject([LookupsService], (service1: LookupsService) => {
    expect(service1).toBeTruthy();
  }));
});
