import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentVal = "";
  getVal(val: string) {
    console.warn(val);
    this.currentVal += "Welcome " + val + "!";
  }

}