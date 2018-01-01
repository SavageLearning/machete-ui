import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableModule } from 'primeng/primeng';

import { FullOrderViewComponent } from './full-order-view.component';
import { WorkOrder } from '../../../../shared/models/work-order';

describe('FullOrderViewComponent', () => {
  let component: FullOrderViewComponent;
  let fixture: ComponentFixture<FullOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullOrderViewComponent ],
      imports: [DataTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullOrderViewComponent);
    component = fixture.componentInstance;
    component.order = new WorkOrder();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
