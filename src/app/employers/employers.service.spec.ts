import { TestBed, inject } from '@angular/core/testing';

import { EmployersService } from './employers.service';

describe('EmployersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployersService]
    });
  });

  it('should be created', inject([EmployersService], (service: EmployersService) => {
    expect(service).toBeTruthy();
  }));
});
