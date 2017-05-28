import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConfirmComponent } from './final-confirm.component';

describe('FinalConfirmComponent', () => {
  let component: FinalConfirmComponent;
  let fixture: ComponentFixture<FinalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
