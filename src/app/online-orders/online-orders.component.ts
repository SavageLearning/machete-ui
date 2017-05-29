import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.css']
})
export class OnlineOrdersComponent implements OnInit {
  private items: MenuItem[];
  activeIndex: number = 0;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Introduction', routerLink: ['online-orders/introduction']},
      {label: 'Confirm', routerLink: ['online-orders/intro-confirm']},
      {label: 'work site details', routerLink: ['online-orders/work-order']},
      {label: 'worker details', routerLink: ['online-orders/work-assignments']},
      {label: 'finalize', routerLink: ['online-orders/final-confirm']}
    ];
  }

}
