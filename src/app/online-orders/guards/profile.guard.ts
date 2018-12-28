
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employer } from '../../shared/models/employer';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    console.log('.ctor');

  }

  canActivate(): Observable<boolean> {
    return this.store.select(fromRoot.getEmployer).pipe(
      map((em: Employer) => {
        console.log('canActivate->getEmployer:', em)
        let exists = em ? true : false;
        if (!exists)
        {
          this.router.navigate(['/employers']);   
        }
        console.log('canActivate:', exists)
        return exists;
        }));
  }
}
