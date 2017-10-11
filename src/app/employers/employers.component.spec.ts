import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployersComponent } from './employers.component';
import { EmployersService } from './employers.service';
import { Observable } from 'rxjs/Observable';
import { LookupsService } from '../lookups/lookups.service';
import { Employer } from '../shared/models/employer';
import { Lookup } from '../lookups/models/lookup';
import { DropdownModule } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployersServiceSpy, LookupsServiceSpy } from '../shared/testing';

describe('EmployersComponent', () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersComponent ],
      imports: [
        ReactiveFormsModule,
        DropdownModule,
        NoopAnimationsModule
      ]
    })
    .overrideComponent(EmployersComponent, {
      set: {
        providers: [
          { provide: EmployersService, useClass: EmployersServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(EmployersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
