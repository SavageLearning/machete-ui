import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionComponent } from './introduction.component';
import { RouterSpy, OnlineOrdersServiceSpy } from "../../shared/testing";
import { Router } from "@angular/router";
import { OnlineOrdersService } from "../online-orders.service";

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionComponent ]
    })
    .overrideComponent(IntroductionComponent, {
      set: {
        providers: [
          { provide: Router, useClass: RouterSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy }
        ]
      }
    })
    .compileComponents();
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
