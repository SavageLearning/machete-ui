import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AppMenuComponent, AppSubMenu } from "./app.menu.component";
import { AppComponent } from "./app.component";
import { By }           from '@angular/platform-browser';
import { DebugElement } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';

// class EmployersServiceSpy {
//   getEmployerBySubject = jasmine.createSpy('getEmployerBySubject')
//     .and.callFake(
//       () => Observable.of(new Employer())
//     );
// }
class AppComponentSpy {

}
describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;
  let el: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMenuComponent, AppSubMenu ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .overrideComponent(AppMenuComponent, {
      set: {
        providers: [
          {provide: AppComponent, useClass: AppComponentSpy}
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppMenuComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement.query(By.css('.item'))
      component
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});