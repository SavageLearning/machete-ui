//default-request-options.service.ts
import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor(private authService: AuthService) {
    super();

    // Set the default 'Authorization' header
    this.headers.set('Authorization', `Bearer woo`);

    // Update: You need to subscribe to an observable that will update the JWT. Otherwise, it will run only once.
    // Something like:
    // AuthService.user.subscribe(user => this.headers.set('Authorization', `Bearer ${user.token}`);)
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
