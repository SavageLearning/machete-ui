import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAssignmentsComponent } from './work-assignments.component';
import { WorkAssignmentsService } from './work-assignments.service';
import { WorkAssignment } from './models/work-assignment';
import { Observable } from 'rxjs/Observable';
import { LookupsService } from '../../lookups/lookups.service';
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { DropdownModule, InputSwitchModule, DataTableModule } from "primeng/primeng";
import { Lookup } from "../../lookups/models/lookup";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

class WorkAssignmentsServiceSpy {
  getAll = jasmine.createSpy('getAll')
    .and.callFake(
      () => new Array<WorkAssignment>()
    );
}
class LookupsServiceSpy {
  getLookups = jasmine.createSpy('getLookups')
    .and.callFake(
      () => Observable.of(new Array<Lookup>())
    );
}

describe('WorkAssignmentsComponent', () => {
  let component: WorkAssignmentsComponent;
  let fixture: ComponentFixture<WorkAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAssignmentsComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        DropdownModule,
        InputSwitchModule,
        DataTableModule
      ]
    })
    .overrideComponent(WorkAssignmentsComponent, {
      set: {
        providers: [
          { provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy },

        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WorkAssignmentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
