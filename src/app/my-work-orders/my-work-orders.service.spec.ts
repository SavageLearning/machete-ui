import { TestBed, inject } from '@angular/core/testing';

import { MyWorkOrdersService } from './my-work-orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/index';

describe('WorkOrdersService', () => {
  let service: MyWorkOrdersService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyWorkOrdersService, AuthService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(MyWorkOrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
