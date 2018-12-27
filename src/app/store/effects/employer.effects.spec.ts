import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EmployerEffects } from './employer.effects';

describe('EmployerEffects', () => {
  let actions$: Observable<any>;
  let effects: EmployerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(EmployerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
