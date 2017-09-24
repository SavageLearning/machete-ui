import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeComponent } from './authorize.component';
import { AuthService } from '../../shared/index';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserManager, User } from 'oidc-client';
import { EventEmitter } from "@angular/core";
class AuthServiceSpy {
  endSigninMainWindow = jasmine.createSpy('endSigninMainWindow')
    .and.callFake(() => { 
      // TODO: Implement a better stub of the User interface
      // https://stackoverflow.com/questions/37027776/how-to-stub-a-typescript-interface-type-definition
      let user = {
        id_token: '',
        session_state: '',
        access_token: '',
        token_type: '',
        scope: '',
        profile: '',
        expires_at: 0,
        state: '',

        expires_in: 0,
        expired: true,
        scopes: new Array<string>()
      } as User;
      return Observable.of(user)}); // void response
  getUserEmitter = jasmine.createSpy('getUserEmitter')
    .and.callFake(() => new EventEmitter<User>());
}
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
