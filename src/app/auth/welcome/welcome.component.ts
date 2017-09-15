import { Component, OnInit } from '@angular/core';
import { ConfigsService } from "../../configs/configs.service";
import { Log } from "oidc-client";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcome: string;
  constructor(private cfgService: ConfigsService) { }

  ngOnInit() {
    this.cfgService.getConfig('WorkCenterDescription_EN')
      .subscribe(
        data => this.welcome = data.value,
        error => Log.error('welcome.component.OnInit:' + error)
      );
  }

}
