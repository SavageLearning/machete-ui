import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionComponent } from './introduction.component';
import { RouterSpy, OnlineOrdersServiceSpy, WorkOrderServiceSpy, WorkAssignmentsServiceSpy, ConfigsServiceSpy } from '../../shared/testing';
import { Router } from '@angular/router';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkAssignmentsService } from '../work-assignments/work-assignments.service';
import { ConfigsService } from '../../configs/configs.service';
import {CardModule} from 'primeng/card';

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionComponent ],
      imports: [CardModule],
    })
    .overrideComponent(IntroductionComponent, {
      set: {
        providers: [
          { provide: Router, useClass: RouterSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy},
          {provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy},
          {provide: ConfigsService, useClass: ConfigsServiceSpy}
        ]
      }
    })
    .compileComponents().catch(e => console.error(e));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
