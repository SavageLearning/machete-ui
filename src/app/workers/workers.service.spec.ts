import { TestBed } from '@angular/core/testing';

import { WorkersService } from './workers.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';

describe('WorkersService', () => {
  let workersService: WorkersService;
  let httpMock:  HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    workersService = TestBed.inject(WorkersService);
    httpMock = TestBed.inject<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
  });

  it('should be created', () => {
    expect(workersService).toBeTruthy();
  });
});
