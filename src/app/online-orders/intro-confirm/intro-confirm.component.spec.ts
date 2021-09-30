import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroConfirmComponent } from './intro-confirm.component';
import { OnlineOrdersService } from '../online-orders.service';
import { OnlineOrdersServiceSpy, RouterSpy } from '../../shared/testing';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('IntroConfirmComponent', () => {
  let component: IntroConfirmComponent;
  let fixture: ComponentFixture<IntroConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroConfirmComponent ],
      imports: [
        CheckboxModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .overrideComponent(IntroConfirmComponent, {
      set: {
        providers: [
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents()
    .catch(e => console.error(e))
    .then(() => {
      fixture = TestBed.createComponent(IntroConfirmComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
