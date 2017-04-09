import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarModule, DataTableModule, TabViewModule } from 'primeng/primeng';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../in-memory-data.service';


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      imports: [ DataTableModule, TabViewModule, CalendarModule, FormsModule, HttpModule ,InMemoryWebApiModule.forRoot(InMemoryDataService) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
