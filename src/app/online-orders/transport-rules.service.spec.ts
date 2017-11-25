import { TestBed, inject } from '@angular/core/testing';

import { TransportRulesService } from './transport-rules.service';

describe('TransportRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportRulesService]
    });
  });

  it('should be created', inject([TransportRulesService], (service: TransportRulesService) => {
    expect(service).toBeTruthy();
  }));
});
