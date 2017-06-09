import { TestBed, inject } from '@angular/core/testing';

import { OnlineOrdersService } from './online-orders.service';

describe('OnlineOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineOrdersService]
    });
  });

  it('should ...', inject([OnlineOrdersService], (service: OnlineOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
