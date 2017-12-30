import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotFoundComponent } from './order-not-found.component';

describe('OrderNotFoundComponent', () => {
  let component: OrderNotFoundComponent;
  let fixture: ComponentFixture<OrderNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
