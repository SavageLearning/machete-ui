import { TestBed, inject } from '@angular/core/testing';

import { WorkAssignmentService } from './work-assignment.service';

describe('WorkAssignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkAssignmentService]
    });
  });

  it('should be created', inject([WorkAssignmentService], (service: WorkAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
