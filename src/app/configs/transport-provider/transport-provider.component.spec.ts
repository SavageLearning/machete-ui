import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportProviderComponent } from './transport-provider.component';

describe('TransportProviderComponent', () => {
  let component: TransportProviderComponent;
  let fixture: ComponentFixture<TransportProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
