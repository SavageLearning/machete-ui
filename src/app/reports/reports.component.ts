import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  items: MenuItem[];

  constructor() {}
  
  ngOnInit(): void {
    this.items = [
      {
          label: 'Reports',
          items: [
            {
              label: 'Report List', 
              icon: 'pi pi-fw pi-list',
              routerLink: [`/reports`],
              routerLinkActiveOptions:{exact:true}
            
            },
            {
              label: 'New Report', 
              icon: 'pi pi-fw pi-plus',
            },
          ]
      },
  ];
  }
  
}
