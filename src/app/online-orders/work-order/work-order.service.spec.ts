import { async, TestBed, inject } from '@angular/core/testing';
import { WorkOrderService } from './work-order.service';
import { environment } from '../../../environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../shared/index';
import { HttpModule } from '@angular/http';
import { AuthServiceSpy, EmployersServiceSpy } from '../../shared/testing';
import { Store, StoreModule } from '@ngrx/store';

describe('WorkOrderService', () => {
  let service: WorkOrderService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkOrderService,
        {provide: AuthService, useClass: AuthServiceSpy }
        ],
      imports: [
        StoreModule.forRoot({}),
        HttpModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(WorkOrderService);
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', inject([WorkOrderService], (service1: WorkOrderService) => {
    expect(service1).toBeTruthy();
  }));
});
