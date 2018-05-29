import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TransportProvider } from './shared/';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransportProvidersService {
  uriBase = environment.dataUrl + '/api/transportproviders';
  providers = new Array<TransportProvider>();
  providersAge = 0;
  constructor(private http: HttpClient) {
    console.log('.ctor');
  }

  isStale(): boolean {
    if (this.providersAge > Date.now() - 300 * 1000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportProviders(): Observable<TransportProvider[]> {
    if (this.isNotStale()) {
      console.log('returning cache', this.providersAge);
      return Observable.of(this.providers);
    }

    return this.http.get(this.uriBase)
      .map(res => {
        this.providers = res['data'] as TransportProvider[];
        this.providersAge = Date.now();
        return res['data'] as TransportProvider[];
      });
  }
}
