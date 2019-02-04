import { Component, Input, OnInit, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from '../app.component';
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
    user: string;
    constructor(private auth: AuthService) {

    }
    active: boolean;

    ngOnInit() {
        this.auth.getUserEmitter()
            .subscribe(
                (user: User) => {
                    if (user === null || user === undefined) {
                        this.user = '<logged out>';
                        return;
                    }
                    if (user.profile == null || user.profile.preferred_username == null) {
                        this.user = 'profile missing';
                    } else {
                        this.user = user.profile.preferred_username;
                    }
                }
            );
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }

    startSignoutMainWindow() {
        this.auth.startSignoutMainWindow();
      }
}
