import { TestBed, inject } from '@angular/core/testing';

import { ConfigsService } from './configs.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('ConfigsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigsService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ConfigsService], (service: ConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
