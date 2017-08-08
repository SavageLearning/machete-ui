import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppTopBar} from './app.topbar.component';
import {InlineProfileComponent} from './app.profile.component';
import {AppMenuComponent, AppSubMenu} from './app.menu.component';
import {AppFooter} from './app.footer.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './not-found.component';
import {APP_BASE_HREF} from '@angular/common';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        PageNotFoundComponent

      ],
      imports: [
        AppRoutingModule,
        NoopAnimationsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
