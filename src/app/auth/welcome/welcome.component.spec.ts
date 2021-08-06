/* eslint-disable arrow-body-style */
/* eslint-disable brace-style */

import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { ConfigsService } from '../../configs/configs.service';
import { Config } from '../../shared/models/config';
import { AuthService } from '../../shared/index';
import { Router } from '@angular/router';
import { AuthServiceSpy, ConfigsServiceSpy, getConfigsList, RouterSpy } from '../../shared/testing';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .overrideComponent(WelcomeComponent, {
      set: {
        providers: [
          { provide: ConfigsService, useClass: ConfigsServiceSpy },
          { provide: AuthService, useClass: AuthServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.componentInstance;
      component.welcome = 'bar';
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have configs all configs', () => {
    getConfigsList().map((conf) => {
      expect(component.serverData).toContain(conf);
    })
  });
});
