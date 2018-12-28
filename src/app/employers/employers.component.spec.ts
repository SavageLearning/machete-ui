import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployersComponent } from './employers.component';
import { LookupsService } from '../lookups/lookups.service';
import { DropdownModule } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LookupsServiceSpy, RouterSpy } from '../shared/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

describe('EmployersComponent', () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersComponent ],
      imports: [
        StoreModule.forRoot({}) ,
        ReactiveFormsModule,
        DropdownModule,
        NoopAnimationsModule
      ]
    })
    .overrideComponent(EmployersComponent, {
      set: {
        providers: [
          { provide: LookupsService, useClass: LookupsServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(EmployersComponent);
      component = fixture.componentInstance;
      store = TestBed.get(Store);

      spyOn(store, 'dispatch').and.callThrough();
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
