import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Report } from '../models/report';

import { ReportsListComponent } from './reports-list.component';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;
  let dialogServiceSpy = jasmine.createSpy('dialogServSpy')
    .and.callFake( () => {
    });
  let dynamicDialogRefServiceSpy = jasmine.createSpy('dynamicDialogRefSpy')
    .and.callFake( () => {
    });
  class DynamicDialogConfigSpy {
    data: any = jasmine.createSpy('dynamicDialogConfigSpy')
    .and.callFake( () => () => new Array<Report>(new Report()) );
  }
  let dynamicDialogConfigSpy = new DynamicDialogConfigSpy();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsListComponent ],
      imports: [],
      providers: [
        {provide: DialogService, value: dialogServiceSpy},
        {provide: DynamicDialogRef, value: dynamicDialogRefServiceSpy},
        {provide: DynamicDialogConfig, value: dynamicDialogConfigSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
