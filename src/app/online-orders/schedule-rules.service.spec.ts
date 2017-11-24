import { TestBed, inject } from '@angular/core/testing';

import { ScheduleRulesService } from './schedule-rules.service';

describe('ScheduleRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleRulesService]
    });
  });

  it('should be created', inject([ScheduleRulesService], (service: ScheduleRulesService) => {
    expect(service).toBeTruthy();
  }));
});
