/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from "@angular/core/testing";

import { TransportProvidersService } from "./transport-providers.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
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
  let clientSpy: jasmine.SpyObj<HttpClient>;
  let messageSpy: jasmine.SpyObj<MessagesService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);

    TestBed.configureTestingModule({
      providers: [
        TransportProvidersService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        {
          provide: MessagesService,
          useClass: MessagesServiceSpy,
        },
      ],
      imports: [],
    });
    service = TestBed.inject(TransportProvidersService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    messageSpy = TestBed.inject(
      MessagesService
    ) as jasmine.SpyObj<MessagesService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("chaching", () => {
    beforeEach(() => {
      spyOn(HttpClient.prototype, "get").calls.reset();
      httpClientSpy.get.and.returnValue(
        of({
          data: [new TransportProvider()],
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
        expect(httpClientSpy.get.calls.count()).toBe(1);
        done();
      });
    });

    it("when NOT stale, should not callApi", (done: DoneFn) => {
      service.providersAge = Date.now() - 300 * 999; // age logic is in service

      service.getTransportProviders().subscribe(() => {
        expect(httpClientSpy.get.calls.count()).toBe(0);
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
        "http://localhost:9876/api/transportproviders"
      );
      expect(testReq.request.method).toEqual("GET");
      testReq.flush("", { status: 500, statusText: "SErver Error" });
    });
  });
});
