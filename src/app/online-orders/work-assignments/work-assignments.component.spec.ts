import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentsComponent } from './work-assignments.component';

describe('WorkAssignmentsComponent', () => {
  let component: WorkAssignmentsComponent;
  let fixture: ComponentFixture<WorkAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
