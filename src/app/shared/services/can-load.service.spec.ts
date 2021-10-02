import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthService } from "..";
import { AuthServiceSpy, RouterSpy } from "../testing";

import { CanLoadService } from "./can-load.service";

describe("CanloadService", () => {
  let service: CanLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceSpy },
        { provide: Router, useClass: RouterSpy },
      ],
    });
    service = TestBed.inject(CanLoadService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
