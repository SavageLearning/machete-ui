import { TestBed } from "@angular/core/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { EmployersService } from "./employers.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../shared/index";
import { AuthServiceSpy } from "../shared/testing";

describe("EmployersService", async () => {
  let service: EmployersService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        EmployersService,
        { provide: AuthService, useClass: AuthServiceSpy },
        HttpClient,
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(EmployersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
