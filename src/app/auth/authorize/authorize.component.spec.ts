import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizeComponent } from './authorize.component';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { AuthServiceSpy } from '../../shared/testing';

class RouterSpy {
  navigate = jasmine.createSpy('navigate')
    .and.callFake((foo) => { console.log(foo)});
}

describe('AuthorizeComponent', () => {
  let component: AuthorizeComponent;
  let fixture: ComponentFixture<AuthorizeComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeComponent ]
    })
    .overrideComponent(AuthorizeComponent, {
            set: {
        providers: [
          { provide: AuthService, useClass: AuthServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents().catch(e => console.error(e));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
