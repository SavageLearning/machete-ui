import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  log(message: string, url?: string, stack?: string) {
    console.log(message);
  }
}
