import { TestBed, inject } from '@angular/core/testing';

import { LookupsService } from './lookups.service';
import { environment } from '../../environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Lookup } from "./models/lookup";

describe('LookupsService', () => {
  let service: LookupsService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupsService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(LookupsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([LookupsService], (service1: LookupsService) => {
    expect(service1).toBeTruthy();
  }));

  it('getLookups should return 1 injected Lookup record', () => {
      service.getLookups('foo')
        .subscribe(rows => {
          expect(rows.length).toBe(1, 'expected 1 lookups');
          expect(rows[0].idString).toBe('Lookup', 'expected typeof Lookup');
        });
      let req = httpMock.expectOne('/api/lookups');
      let testdata = new Array<Lookup>();
      testdata.push(new Lookup({category: 'foo'}));
      testdata.push(new Lookup({category: 'bar'}));
      req.flush({data: testdata});
    }
  );

  it('getLookup should return 1 injected Lookup record',
  () => {
    service.getLookup(2)
      .subscribe(lookup => {
        expect(lookup.id).toBe(2, 'expected lookup with id=2');
        expect(lookup.idString).toBe('Lookup', 'expected typeof Lookup');
      });
    let req = httpMock.expectOne('/api/lookups');
    let testdata = new Array<Lookup>();
    testdata.push(new Lookup({id: 1}));
    testdata.push(new Lookup({id: 2}));
    testdata.push(new Lookup({id: 3}));
    req.flush({data: testdata});
  }
);

  it('getAllLookups should return an injected Lookup record',
    () => {
      service.getAllLookups()
        .subscribe(rows => {
          expect(rows.length).toBe(1, 'expected 1 lookups');
          expect(rows[0].idString).toBe('Lookup', 'expected typeof Lookup');
        });
      let req = httpMock.expectOne('/api/lookups');
      let testdata = new Array<Lookup>();
      testdata.push(new Lookup());
      req.flush({data: testdata});
    }
  );
});
