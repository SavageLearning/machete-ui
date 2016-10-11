import {EmployerListComponent} from "../app/employer_list.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {EmployerService} from "../app/services/employer.service";

describe('machete-ui E2E Tests', function () {
  let expectedMsg = 'Machete-UI';
  let comp:    EmployerListComponent;
  let svc:     EmployerService;
  let fixture: ComponentFixture<EmployerListComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(function () {

    svc = TestBed.get(EmployerService);

    TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
            .configureTestingModule({
              declarations: [ EmployerListComponent ],
              providers:    [ {provide: EmployerService, useValue: svc } ]
            });
    fixture = TestBed.createComponent(EmployerListComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display: ' + expectedMsg, function () {
    expect(el.textContent).toEqual(expectedMsg);
  });

});
