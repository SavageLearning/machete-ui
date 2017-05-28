import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import {DialogModule, InputSwitchModule, CalendarModule, DataTableModule, TabViewModule, DropdownModule} from 'primeng/primeng';

import { ExportsOptionsComponent } from './exports-options.component';

describe('ExportsOptionsComponent', () => {
  let component: ExportsOptionsComponent;
  let fixture: ComponentFixture<ExportsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportsOptionsComponent ],
      imports: [
        DataTableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        InputSwitchModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsOptionsComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
