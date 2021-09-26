import { Component } from '@angular/core';

/**
 * Dumnb component holding the router outlet
 */
@Component({
  selector: 'app-auth',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AuthComponent {

  constructor() {
    console.log('ctor');
  }

}
