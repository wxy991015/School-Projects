import { Component, OnInit } from '@angular/core';
import { interval, timer, Subscription } from 'rxjs';
import { SiblingService } from '../sibling.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public subscription: Subscription;

  constructor(
    private sblService: SiblingService
    ) { }

  // data: number = 0;
  ngOnInit(): void {
    // const obs$=interval(1000);
    // obs$.subscribe((d)=>{
    //   this.data = d;
    // })
  }
  
  subscrb = this.sblService.getStatus().subscribe( (smth: boolean) => this.setVar(smth))
  timeLeft: number = 61;
  interval: any;
  gameOver: boolean = false;
  gameStatus: string = "Press the button below to Start the game."

  setVar(rec: boolean) {
    if (rec == true){
      this.startTimer()
    }
    else {
      console.log("The current value is: " + rec)
    }
  }

  startTimer() {
    if(this.gameOver == false){
      this.interval = setInterval(() => {
        if(this.timeLeft > 1) {
          this.timeLeft--;
          this.gameStatus = this.timeLeft.toString() + " Seconds Left..."
        } else {
          this.gameOver = true;
          this.gameStatus = "Game Over. You ran out of time."
        }
      },1000)
    }
    else {
      this.sblService.updateStatus(false);
    }

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
