import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/primeng';
import { OnlineOrdersService } from '../online-orders.service';
import { Router } from '@angular/router';
import { Confirm } from "../shared/models/confirm";

@Component({
  selector: 'app-intro-confirm',
  templateUrl: './intro-confirm.component.html',
  styleUrls: ['./intro-confirm.component.css']
})
export class IntroConfirmComponent implements OnInit {
  status = false;
  // TODO: Refactor as a service that polls from API
  confirms = [
    new Confirm({
      name: 'completion',
      description: `This order is not complete until you receive a confirmation email from Casa Latina.
      If you do not hear from us or if you need a worker with 48 hours please call 206.956.0779 x3 during our business hours`,
      confirmed: false
    }),
    new Confirm({
      name: 'arrival_time',
      description: `Please allow a one hour window for worker(s) to arrive. This will account for transportation
      routes with multiple stops and for traffic. There is no transportation fee to hire a Casa Latina
      worker when you pick them up from our office. To have your worker(s) arrive at your door,
      there is a small fee payable through this form.`,
      confirmed: false
    }),
    new Confirm({
      name: 'employer_agency',
      description: `Casa Latina workers are not contractors. You will need to provide all tools, materials, and
      safety equipment necessary for the job you wish to have done.`,
      confirmed: false
    })
    
  ];
  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
  }

  ngOnInit() {
    this.onlineService.getInitialConfirmedStream()
    .subscribe(
      confirmed => {
        this.status = confirmed;
      }
    );
  }

  checkConfirm(event: Event) {
    this.onlineService.setInitialConfirm(this.status);
  }

  nextStep() {
    this.router.navigate(['/online-orders/work-order']);
  }

}
