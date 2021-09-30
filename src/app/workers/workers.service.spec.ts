import { TestBed } from '@angular/core/testing';

import { WorkersService } from './workers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('WorkersService', () => {
  let workersService: WorkersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    workersService = TestBed.inject(WorkersService);
  });

  it('should be created', () => {
    expect(workersService).toBeTruthy();
  });
});
