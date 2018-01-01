import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkOrdersComponent } from './my-work-orders.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkOrderDatatableComponent', () => {
  let component: MyWorkOrdersComponent;
  let fixture: ComponentFixture<MyWorkOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkOrdersComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
