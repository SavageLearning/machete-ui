import { TestBed, inject } from '@angular/core/testing';

import { WorkAssignmentsService } from './work-assignments.service';

describe('WorkAssignmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkAssignmentsService]
    });
  });

  it('should be created', inject([WorkAssignmentsService], (service: WorkAssignmentsService) => {
    expect(service).toBeTruthy();
  }));
});
