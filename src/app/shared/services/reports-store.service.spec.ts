import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessagesService } from '../components/messages/messages.service';
import { MessagesServiceSpy, RouterSpy } from '../testing';

import { ReportsStoreService } from './reports-store.service';

describe('ReportsStoreService', () => {
  let service: ReportsStoreService;
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: Router, useClass: RouterSpy},
        {provide: MessagesService, useClass: MessagesServiceSpy},
        {provide: HttpClient, value: httpClientSpy}
      ]
    });
    service = TestBed.inject(ReportsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
