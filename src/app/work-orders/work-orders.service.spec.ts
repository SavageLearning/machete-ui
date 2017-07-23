import { TestBed, inject } from '@angular/core/testing';

import { WorkOrdersService } from './work-orders.service';

describe('WorkOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkOrdersService]
    });
  });

  it('should be created', inject([WorkOrdersService], (service: WorkOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
