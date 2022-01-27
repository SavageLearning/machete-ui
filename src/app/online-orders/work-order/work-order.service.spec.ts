import { TestBed, inject } from "@angular/core/testing";
import { WorkOrderService } from "./work-order.service";
import { environment } from "../../../environments/environment";
import { HttpTestingController } from "@angular/common/http/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EmployersService } from "../../employers/employers.service";
import { AuthService } from "../../shared/index";
import { HttpClientModule } from "@angular/common/http";
import { AuthServiceSpy, EmployersServiceSpy } from "../../shared/testing";

describe("WorkOrderService", () => {
  let service: WorkOrderService;
  let httpMock: HttpTestingController;
  const baseref: string = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkOrderService,
        { provide: EmployersService, useClass: EmployersServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(WorkOrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", inject(
    [WorkOrderService],
    (service1: WorkOrderService) => {
      expect(service1).toBeTruthy();
    }
  ));
});
