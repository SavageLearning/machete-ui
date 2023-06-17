/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MessagesService } from "../components/messages/messages.service";
import { MessagesServiceSpy } from "../testing";

import { AppSettingsStoreService } from "./app-settings-store.service";
import { ConfigsService } from "machete-client";
import { takeWhile } from "rxjs/operators";

describe("AppSettingsStoreService", () => {
  let service: AppSettingsStoreService;
  let configsClientSpy: any;
  let killSubscriptions: boolean;

  beforeEach(() => {
    configsClientSpy = jasmine.createSpyObj("ConfigsService", [
      "apiConfigsGet",
      "apiConfigsIdPut",
    ]);
    killSubscriptions = false;
    TestBed.configureTestingModule({
      providers: [
        AppSettingsStoreService,
        ConfigsService,
        { provide: MessagesService, useClass: MessagesServiceSpy },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AppSettingsStoreService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("when STALE, SHOULD call Api", () => {
    configsClientSpy.apiConfigsGet.calls.reset();
    service.refreshCache();
    service.all$.subscribe(() => {
      expect(configsClientSpy.apiConfigsGet).toHaveBeenCalledTimes(1);
    });
  });

  it("when NOT stale, should not callApi", () => {
    service.all$
      .pipe(takeWhile(() => !killSubscriptions))
      .subscribe(() => configsClientSpy.apiConfigsGet.calls.reset()); //initial http request
    service.setCacheTTL(5000);
    service.all$.pipe(takeWhile(() => !killSubscriptions)).subscribe((res) => {
      console.log("______RES_____", res);
      expect(configsClientSpy.apiConfigsGet).toHaveBeenCalledTimes(0);
    }); // chache
  });
});
