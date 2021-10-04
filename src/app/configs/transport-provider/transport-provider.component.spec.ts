/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TransportProvidersStoreService } from "src/app/shared/services/transport-providers-store.service";
import { TransportProvidersStoreServiceSpy } from "src/app/shared/testing/services.spy";

import { TransportProviderComponent } from "./transport-provider.component";

describe("c", () => {
  let component: TransportProviderComponent;
  let fixture: ComponentFixture<TransportProviderComponent>;
  // const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["get"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportProviderComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: TransportProvidersStoreService,
          useClass: TransportProvidersStoreServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
