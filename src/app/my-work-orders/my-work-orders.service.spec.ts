import { TestBed } from '@angular/core/testing';

import { MyWorkOrdersService } from './my-work-orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../shared/index';

describe('WorkOrdersService', () => {
  let service: MyWorkOrdersService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyWorkOrdersService, AuthService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MyWorkOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
