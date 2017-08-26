import { TestBed, inject } from '@angular/core/testing';
import { WorkAssignmentsService } from './work-assignments.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../../environments/environment";
import { WorkAssignment } from "./models/work-assignment";
import { OnlineOrdersService } from "../online-orders.service";

describe('WorkAssignmentsService', () => {
  let service: WorkAssignmentsService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkAssignmentsService, OnlineOrdersService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(WorkAssignmentsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([WorkAssignmentsService], (service: WorkAssignmentsService) => {
    expect(service).toBeTruthy();
  }));

  it('should save a record to sessions storage', () => {
    let wa = new WorkAssignment({id: 123});
    service.save(wa);
    let data = sessionStorage.getItem(WorkAssignmentsService.storageKey);
    let result = JSON.parse(data);
    expect(result[0].id).toBe(123, 'expected record just created to be in storage');
  });

  it('should getAll a record', () => {
    let wa = new WorkAssignment({id: 123});
    service.save(wa);
    let result = service.getAll();
    expect(result[0].id).toBe(123, 'expected record just created');
  });

  it('should delete a record', () => {
    service.save(new WorkAssignment({id: 1}));
    service.save(new WorkAssignment({id: 3}));
    service.save(new WorkAssignment({id: 4}));
    service.delete(<WorkAssignment>{id: 3});
    let result = service.getAll();
    expect(result.find(f => f.id ===1)).toBeTruthy('expected to find record id=1');
    expect(result.find(f => f.id ===4)).toBeTruthy('expected to find record id=4');
    expect(result.find(f => f.id ===3)).toBeFalsy('expected to NOT find record id=3');
  });

});
