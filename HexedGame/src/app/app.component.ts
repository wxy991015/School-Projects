import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'hexed';

  sldrR(value: string){
    console.log(value);
    var tmp = document.getElementById("redSlider") as HTMLFormElement;
    tmp.innerHTML = "R: " + value
  }

  sldrB(value: string){
    console.log(value);
    var tmp = document.getElementById("blueSlider") as HTMLFormElement;
    tmp.innerHTML = "B: " + value
  }

  sldrG(value: string){
    console.log(value);
    var tmp = document.getElementById("greenSlider") as HTMLFormElement;
    tmp.innerHTML = "G: " + value
  }  
}

