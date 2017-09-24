import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Log } from "oidc-client";

@Injectable()
export class SequenceGuard implements CanActivate {
  canActivate() {
    //console.log('canActivate');
    return true;
  }
}