import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { ConfigsService } from "../../configs/configs.service";
import { Observable } from "rxjs/Observable";
import { Config } from "../../shared/models/config";
import { AuthService } from "../../shared/index";

class ConfigsServiceSpy {
  getConfig = jasmine.createSpy('getConfig')
    .and.callFake(
      () => {
        let configs = new Array<Config>();
        configs.push(new Config({key: 'WorkCenterDescription_EN', value:'foo'}));
        return Observable.of(configs);
      }
    );
}

class AuthServiceSpy {
  startSigninMainWindow = jasmine.createSpy('startSigninMainWindow');
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .overrideComponent(WelcomeComponent, {
      set: {
        providers: [
          { provide: ConfigsService, useClass: ConfigsServiceSpy },
          { provide: AuthService, useClass: AuthServiceSpy }
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
});
