/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from "@angular/core/testing";

import { TransportProvidersService } from "./transport-providers.service";
import {
  TransportProvidersService as TransportProvidersClient,
  TransportProviderVM,
} from "machete-client";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MessagesServiceSpy } from "../shared/testing/services.spy";
import { MessagesService } from "../shared/components/messages/messages.service";
import { TransportProvider } from "./shared";
import { of } from "rxjs";

describe("TransportProviderService", () => {
  let service: TransportProvidersService;
  let messageSpy: jasmine.SpyObj<MessagesService>;
  let tpClient: jasmine.SpyObj<TransportProvidersClient>;

  beforeEach(() => {
    tpClient = jasmine.createSpyObj("TransportProvidersClient", [
      "apiTransportProvidersGet",
    ]);

    TestBed.configureTestingModule({
      providers: [
        TransportProvidersService,
        {
          provide: TransportProvidersClient,
          useValue: tpClient,
        },
        {
          provide: MessagesService,
          useClass: MessagesServiceSpy,
        },
      ],
      imports: [],
    });
    service = TestBed.inject(TransportProvidersService);
    tpClient = TestBed.inject(
      TransportProvidersClient
    ) as jasmine.SpyObj<TransportProvidersClient>;
    messageSpy = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("chaching", () => {
    beforeEach(() => {
      const tpVm: TransportProviderVM = {};
      spyOn(
        TransportProvidersClient.prototype,
        "apiTransportProvidersGet"
      ).calls.reset();
      // ah! typescript
      (
        (tpClient as jasmine.SpyObj<TransportProviderVM>)[
          "apiTransportProvidersGet"
        ] as jasmine.Spy
      ).and.returnValue(
        of({
          data: [tpVm],
        })
      );
    });

    it("when api called, session var is set", (done: DoneFn) => {
      service.getTransportProviders().subscribe(() => {
        expect(
          (
            JSON.parse(
              sessionStorage.getItem("tranportProviders")
            ) as TransportProvider[]
          ).length
        ).toBe(1);
        done();
      });
    });

    it("when none, should callApi", (done: DoneFn) => {
      service.getTransportProviders().subscribe(() => {
        expect(tpClient["apiTransportProvidersGet"].calls.count()).toBe(1);
        done();
      });
    });

    it("when NOT stale, should not callApi", (done: DoneFn) => {
      service.providersAge = Date.now() - 300 * 999; // age logic is in service

      service.getTransportProviders().subscribe(() => {
        expect(tpClient["apiTransportProvidersGet"].calls.count()).toBe(0);
        done();
      });
    });
  });
});

describe("TransportProviderServiceHttp", () => {
  let service: TransportProvidersService;
  let httpMock: HttpTestingController;
  let messageSpy: jasmine.SpyObj<MessagesService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessagesService,
          useClass: MessagesServiceSpy,
        },
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(TransportProvidersService);
    httpMock = TestBed.inject(HttpTestingController);
    messageSpy = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;
  });

  describe("when http error", () => {
    it("should call showErrors toast", (done: DoneFn) => {
      service.getTransportProviders().subscribe({
        next: () => done.fail("should have failed with the 500 error"),
        error: () => {
          expect(messageSpy.showErrors.calls.count()).toBe(1);
          done();
        },
      });

      const testReq = httpMock.expectOne(
        "http://localhost/api/TransportProviders"
      );
      expect(testReq.request.method).toEqual("GET");
      testReq.flush("", { status: 500, statusText: "SErver Error" });
    });
  });
});
