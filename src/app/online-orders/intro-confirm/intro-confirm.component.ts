import { Component, OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/primeng';
import { OnlineOrdersService } from '../online-orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-confirm',
  templateUrl: './intro-confirm.component.html',
  styleUrls: ['./intro-confirm.component.css']
})
export class IntroConfirmComponent implements OnInit {
  status = false;
  constructor(private onlineService: OnlineOrdersService, private router: Router) { }

  ngOnInit() {
  }

  confirm() {
    this.status = true;
    this.onlineService.setInitialConfirm(this.status);
    this.onlineService.setActiveStep(2); // step 1 == confirm

    this.router.navigate(['/online-orders/work-order']);
  }
}
