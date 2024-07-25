import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  private running = false;
  private elapsedTime = 0;
  private interval$ = interval(10);  // Update interval to 10ms
  private elapsedTimeSubject = new BehaviorSubject<number>(this.elapsedTime);

  elapsedTime$ = this.elapsedTimeSubject.asObservable();

  start() {
    if (!this.running) {
      this.running = true;
      this.interval$.pipe(
        startWith(0),
        takeWhile(() => this.running),
        map(() => this.elapsedTime += 10)  // Increment elapsedTime by 10ms
      ).subscribe(time => this.elapsedTimeSubject.next(time));
    }
  }

  pause() {
    this.running = false;
  }

  stop() {
    this.running = false;
  }

  reset() {
    this.elapsedTime = 0;
    this.elapsedTimeSubject.next(this.elapsedTime);
  }
}
