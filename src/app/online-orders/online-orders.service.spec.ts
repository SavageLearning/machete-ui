import { TestBed, inject } from '@angular/core/testing';
import { OnlineOrdersService } from './online-orders.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkOrderService } from './work-order/work-order.service';
import { AuthService } from '../shared/index';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { HttpModule } from '@angular/http';
import { WorkOrderServiceSpy, AuthServiceSpy, WorkAssignmentsServiceSpy } from "../shared/testing";
import { StoreModule, Store } from '@ngrx/store';

describe('OnlineOrdersService', () => {
  let service: OnlineOrdersService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnlineOrdersService,
        { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },
        { provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy }
      ],
      imports: [
        HttpModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ]
    }).compileComponents();
    service = TestBed.get(OnlineOrdersService);
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ...', inject([OnlineOrdersService], (service1: OnlineOrdersService) => {
    expect(service1).toBeTruthy();
  }));
});
