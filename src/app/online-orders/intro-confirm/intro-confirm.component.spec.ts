import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroConfirmComponent } from './intro-confirm.component';
import { OnlineOrdersService } from '../online-orders.service';
import { ScheduleRule } from '../shared/index';

class OnlineOrdersServiceSpy {
  scheduleRules = jasmine.createSpy('scheduleRules')
    .and.callFake(
      () => new Array<ScheduleRule>()
    );
}

describe('IntroConfirmComponent', () => {
  let component: IntroConfirmComponent;
  let fixture: ComponentFixture<IntroConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroConfirmComponent ]
    })
    .overrideComponent(IntroConfirmComponent, {
      set: {
        providers: [
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
