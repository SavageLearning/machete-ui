import { Component, OnInit } from '@angular/core';

/**
 * Dumnb component holing the router outlet
 */
@Component({
  selector: 'app-auth',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AuthComponent implements OnInit {

  constructor() {
    console.log('ctor');
  }

  ngOnInit(): void {
  }

}
