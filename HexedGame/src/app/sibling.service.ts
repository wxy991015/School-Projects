import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingService {

  private runningGame = new Subject<boolean>();

  constructor(
    ) { }

  public getStatus(): Observable<boolean> {
    return this.runningGame.asObservable();
  }

  public updateStatus(state: boolean): void {
    this.runningGame.next(state);
    //console.log(this.runningGame)
  }


}
