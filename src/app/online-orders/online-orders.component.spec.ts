import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlineOrdersComponent } from './online-orders.component';
import { StepsModule } from 'primeng/steps';
import { OnlineOrdersService } from './online-orders.service';
import { OnlineOrdersServiceSpy, RouterSpy } from '../shared/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('OnlineOrdersComponent', () => {
  let component: OnlineOrdersComponent;
  let fixture: ComponentFixture<OnlineOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [

       ],
      imports: [
        StepsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
        { provide: Router, useClass: RouterSpy }
      ]
    })
    .compileComponents().catch(e => console.error(e));
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
