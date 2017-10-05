import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlineOrdersComponent } from './online-orders.component';
import { StepsModule } from 'primeng/primeng';
import { OnlineOrdersService } from "./online-orders.service";
import { OnlineOrdersServiceSpy, RouterSpy } from "../shared/testing";
import { Router } from "@angular/router";

describe('OnlineOrdersComponent', () => {
  let component: OnlineOrdersComponent;
  let fixture: ComponentFixture<OnlineOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineOrdersComponent ],
      imports: [
        StepsModule,
        RouterTestingModule
      ]
    })
    .overrideComponent(OnlineOrdersComponent, {
      set: {
        providers: [
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: Router, useClass: RouterSpy } 
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
