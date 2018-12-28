import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpModule } from '@angular/http';
import { EmployerEffects } from './employer.effects';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployerEffects', () => {
  let actions$: Observable<any>;
  let effects: EmployerEffects;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployerEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpModule,
        HttpClientTestingModule
      ]
    });

    effects = TestBed.get(EmployerEffects);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
