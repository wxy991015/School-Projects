import { Component, OnInit } from '@angular/core';
import { SiblingService } from '../sibling.service'

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  color = '';
  startedOnce = false;

  constructor(
    private sblService: SiblingService
    ) { }

  ngOnInit(): void {
  }

  public genColor() {
    if (this.startedOnce == false){
      this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      this.sblService.updateStatus(true);
      this.startedOnce = true;
    }
  }

}
