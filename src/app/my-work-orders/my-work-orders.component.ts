import { Component } from '@angular/core';
import { MyWorkOrdersService } from './my-work-orders.service';

@Component({
  selector: 'app-my-work-orders',
  templateUrl: './my-work-orders.component.html',
  styleUrls: ['./my-work-orders.component.css'],
  providers: [MyWorkOrdersService]
})
export class MyWorkOrdersComponent {


  // constructor() { }

}
