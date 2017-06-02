import { TestBed, inject } from '@angular/core/testing';

import { LookupsService } from './lookups.service';

describe('LookupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupsService]
    });
  });

  it('should ...', inject([LookupsService], (service: LookupsService) => {
    expect(service).toBeTruthy();
  }));
});
