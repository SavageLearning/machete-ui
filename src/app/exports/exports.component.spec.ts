import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {DialogModule, CalendarModule, DataTableModule, TabViewModule, DropdownModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import { ExportsComponent } from './exports.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {ExportsService} from './exports.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ExportsOptionsComponent } from './exports-options.component';
describe('ExportsComponent', () => {
  let component: ExportsComponent;
  let fixture: ComponentFixture<ExportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportsComponent, ExportsOptionsComponent ],
      providers: [ExportsService ],
      imports: [
        NoopAnimationsModule,
        DataTableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the export list',
    async(inject([ExportsService], (service: ExportsService) => {
      service.getExportsList()
        .toPromise()
        .then(rows => {
          expect(rows.length).toBe(2, 'expected 2 in exports list');
        });
    }))
  );


});
