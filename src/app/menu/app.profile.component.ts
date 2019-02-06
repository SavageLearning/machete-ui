import { Component, Input, OnInit, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../shared/index';
import { User } from '../shared/services/user-manager';

@Component({
    selector: 'inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class InlineProfileComponent implements OnInit {
    username: string;
    active: boolean;

    constructor(private auth: AuthService) {

    }

    ngOnInit() {
        this.auth.getUserEmitter()
            .subscribe(
                (user: User) => {
                  if (!user) { this.username = 'user missing'; return; }
                  if (!user.profile) { this.username = 'profile missing'; return; }
                  if (!user.profile.preferred_username) { this.username = 'Not logged in'; return; }
                  this.username = user.profile.preferred_username;
                }
            );
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }

    startSignoutMainWindow(e) {
      e.preventDefault();

      this.auth.startSignoutMainWindow();
    }
}
