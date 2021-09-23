import { TestBed } from '@angular/core/testing';

import { CanLoadService } from './can-load.service';

describe('CanloadService', () => {
  let service: CanLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
