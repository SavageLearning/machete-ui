import { TestBed, inject } from '@angular/core/testing';

import { TransportProvidersService } from './transport-providers.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TransportProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportProvidersService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents().catch(e => console.error(e));
    TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([TransportProvidersService], (service: TransportProvidersService) => {
    expect(service).toBeTruthy();
  }));
});
