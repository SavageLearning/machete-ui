/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TransportProvidersServiceSpy } from "src/app/shared/testing/services.spy";

import { TransportProviderListComponent } from "./transport-provider-list.component";
import { TransportProvidersService } from "src/app/online-orders/transport-providers.service";

describe("c", () => {
  let component: TransportProviderListComponent;
  let fixture: ComponentFixture<TransportProviderListComponent>;
  // const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["get"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportProviderListComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: TransportProvidersService,
          useClass: TransportProvidersServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
