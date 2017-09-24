import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineOrdersService } from '../online-orders.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(private router: Router, private onlineService: OnlineOrdersService) {}

  ngOnInit() {
  }

  onClick() {
    this.onlineService.setActiveStep(1); // step 1 == confirm
    this.router.navigate(['/online-orders/intro-confirm']);
  }

}
