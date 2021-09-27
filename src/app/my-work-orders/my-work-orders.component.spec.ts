import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkOrdersComponent } from './my-work-orders.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyWorkOrdersComponent', () => {
  let component: MyWorkOrdersComponent;
  let fixture: ComponentFixture<MyWorkOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkOrdersComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    // .overrideComponent(MyWorkOrdersComponent, {
    //   set: {
    //     providers: [

    //     ]
    //   }
    // })
    .compileComponents().catch(e => console.error(e));
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
