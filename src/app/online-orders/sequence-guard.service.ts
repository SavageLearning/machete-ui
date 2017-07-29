import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Log } from 'oidc-client';
import { Observable } from "rxjs/Observable";
import { OnlineOrdersService } from "./online-orders.service";

@Injectable()
export class SequenceGuardService implements CanActivate {

    constructor(private ordersService: OnlineOrdersService, private router: Router) {
      Log.info('sequence-guard.service.ctor called');
    }

    // how do i know what step (1-5) I am being called from?
    canActivate(): boolean {
        let foo = this.router.url;
        return true;
    }

}