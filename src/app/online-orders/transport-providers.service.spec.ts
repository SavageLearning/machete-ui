import { TestBed, inject } from '@angular/core/testing';

import { TransportProvidersService } from './transport-providers.service';

describe('TransportProviderRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportProvidersService]
    });
  });

  it('should be created', inject([TransportProvidersService], (service: TransportProvidersService) => {
    expect(service).toBeTruthy();
  }));
});
