import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalNoticeComponent } from './paypal-notice.component';

describe('PaypalNoticeComponent', () => {
  let component: PaypalNoticeComponent;
  let fixture: ComponentFixture<PaypalNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
