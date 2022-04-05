/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from "@angular/core/testing";

import { TransportProvidersService } from "./transport-providers.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TransportProvidersService as TransportProvidersClient } from "machete-client";
import {
  MessagesServiceSpy,
  TransportProvidersClientSpy,
} from "../shared/testing/services.spy";
import { MessagesService } from "../shared/components/messages/messages.service";
import { TransportProvider } from "./shared";

describe("TransportProviderService", () => {
  let service: TransportProvidersService;
  let clientSpy: jasmine.SpyObj<TransportProvidersClient>;
  let messageSpy: jasmine.SpyObj<MessagesService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransportProvidersService,
        {
          provide: TransportProvidersClient,
          useClass: TransportProvidersClientSpy,
        },
        {
          provide: MessagesService,
          useClass: MessagesServiceSpy,
        },
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(TransportProvidersService);
    clientSpy = TestBed.inject(
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
      spyOn(
        TransportProvidersClient.prototype,
        "apiTransportProvidersGet"
      ).calls.reset();
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
        expect(clientSpy.apiTransportProvidersGet.calls.count()).toBe(1);
        done();
      });
    });

    it("when NOT stale, should not callApi", (done: DoneFn) => {
      service.providersAge = Date.now() - 300 * 999; // age logic is in service

      service.getTransportProviders().subscribe(() => {
        expect(clientSpy.apiTransportProvidersGet.calls.count()).toBe(0);
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
        TransportProvidersClient, // use real client to utilize httController
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
    it("should call showErrors toast", () => {
      service.getTransportProviders().subscribe({
        next: () => fail("should have failed with the 500 error"),
        error: () => {
          expect(messageSpy.showErrors.calls.count()).toBe(1);
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
