import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsOptionsComponent } from './exports-options.component';

describe('ExportsOptionsComponent', () => {
  let component: ExportsOptionsComponent;
  let fixture: ComponentFixture<ExportsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
