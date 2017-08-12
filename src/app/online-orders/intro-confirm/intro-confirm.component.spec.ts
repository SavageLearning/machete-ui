import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroConfirmComponent } from './intro-confirm.component';

describe('IntroConfirmComponent', () => {
  let component: IntroConfirmComponent;
  let fixture: ComponentFixture<IntroConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroConfirmComponent ]
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
