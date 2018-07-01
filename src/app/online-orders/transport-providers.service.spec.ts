import { TestBed, inject } from '@angular/core/testing';

import { TransportProvidersService } from './transport-providers.service';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('TransportProviderService', () => {
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportProvidersService],
      imports: [
        HttpModule,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([TransportProvidersService], (service: TransportProvidersService) => {
    expect(service).toBeTruthy();
  }));
});
