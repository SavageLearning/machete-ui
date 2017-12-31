import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../../shared/models/work-order';
import { LookupsService } from '../../lookups/lookups.service';
import { LCategory } from '../../lookups/models/lookup';
import { Observable } from 'rxjs/Observable';
import * as paypal from 'paypal-checkout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  order = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number = 0;
  laborCost: number;
  // paypal values
  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox:    'AeabfiAbx3eY7bFZDsns0L4u77c4TE4cLuU8bZ4hWA1u9D5kVA2_KbBIJh3mIJcjJ96fGEckqoi9ynyr',
      production: 'AcXQ3nPggEKWs48Q6_L8F9nwXppmuLNCRAfhzIsOHejWYvUr7Ob1Ciekdc0v4lRliCl0nIW6abuKQeuM'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.transportCost, currency: 'USD' } }
          ]
        },
        experience: {
          input_fields: {
              no_shipping: 1
          }
        },
      });
    },
    onAuthorize: (data, actions) => {
      console.log('Payment was successful!', data, actions);
      // TODO: add confirmation notice/spinner
      this.onlineService.executePaypal(this.order.id, data['payerID'], data['paymentID'], data['paymentToken'])
        .subscribe(
          data => console.log('execute paypal returned:', data),
          error => console.error('execute paypal errored:', error));
    },
    onCancel: function(data) {
      console.log('The payment was cancelled!', data);
    },
    onError: function(err) {
      console.log('There was an error:', err);
    }
  };

  constructor(
    private onlineService: OnlineOrdersService,
    private lookups: LookupsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    Observable.combineLatest(
      this.lookups.getLookups(LCategory.TRANSPORT),
      this.onlineService.getOrder(id),
      
    ).subscribe(([l,o])=>{
      console.log('ngOnInit:combineLatest received:', l,o);
      this.order = o;
      if (o == null) {
        this.router.navigate(['/online-orders/order-not-found'])
        return;
      }
      this.transportLabel = l.find(ll => ll.id == o.transportMethodID).text_EN;
      let wa = o.workAssignments;
      if (wa != null && wa.length > 0) {
        // sums up the transport  costs
        this.transportCost = 
          wa.map(wa => wa.transportCost)
            .reduce((a, b) => a + b);
        this.workerCount = wa.length;
        // sums up the labor costs
        this.laborCost = 
          wa.map(wa => wa.hourlyWage * wa.hours)
            .reduce((a, b) => a + b);      
      } else {
        this.workerCount = 0;
        this.transportCost = 0;
        this.laborCost = 0;
      }
    },
    error => console.error('error', error));
  }

  public ngAfterViewChecked(): void {
    if(this.transportCost > 0 && !this.didPaypalScriptLoad) {
      //this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
        this.didPaypalScriptLoad = true;
      //});
    }
  }
  // This is a hacky just-in-time load of the 176k checkout.js
  // it blows up the tests because the call isn't mocked.
  // Ignoring for now
  // https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/
  // https://github.com/KevinShiCA/ng4-paypal-button/blob/master/src/app/app.component.ts
  // public loadPaypalScript(): Promise<any> {
  //   this.didPaypalScriptLoad = true;
  //   return new Promise((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   });
  // }

}
