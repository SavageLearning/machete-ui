import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeComponent } from './authorize.component';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManager, User } from '../../shared/services/user-manager';
import { EventEmitter } from '@angular/core';
import { AuthServiceSpy } from '../../shared/testing';

class RouterSpy {
  navigate = jasmine.createSpy('navigate')
    .and.callFake((foo) => {});
}

describe('AuthorizeComponent', () => {
  let component: AuthorizeComponent;
  let fixture: ComponentFixture<AuthorizeComponent>;
  let spy: any;
  beforeEach(async(() => {
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
    .compileComponents();
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
