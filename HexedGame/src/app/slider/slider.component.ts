import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() newSliderEvent = new EventEmitter<string>();

  updateSlider(value: string) {
    this.newSliderEvent.emit(value);
  }

}

