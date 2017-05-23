import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
})
export class ExportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('exports.component: wee');
  }

}
