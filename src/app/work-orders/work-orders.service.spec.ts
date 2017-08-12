import { TestBed, inject } from '@angular/core/testing';

import { WorkOrdersService } from './work-orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/index';

describe('WorkOrdersService', () => {
  let service: WorkOrdersService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkOrdersService, AuthService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(WorkOrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
