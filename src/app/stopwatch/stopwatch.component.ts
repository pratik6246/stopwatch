import { Component, OnInit } from '@angular/core';
import { StopwatchService } from '../stopwatch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  elapsedTime: Observable<number>;
  running: boolean = false;
  stopped: boolean = false;

  minutes: string = '00';
  seconds: string = '00';
  centiseconds: string = '00';

  constructor(private stopwatchService: StopwatchService) {
    this.elapsedTime = this.stopwatchService.elapsedTime$;
    this.elapsedTime.subscribe(time => this.updateTime(time));
  }

  ngOnInit(): void {}

  startPause() {
    this.running = !this.running;
    this.stopped = false;
    this.running ? this.stopwatchService.start() : this.stopwatchService.pause();
  }

  stop() {
    this.running = false;
    this.stopped = true;
    this.stopwatchService.stop();
  }

  reset() {
    this.running = false;
    this.stopped = false;
    this.stopwatchService.reset();
  }

  private updateTime(time: number) {
    const totalCentiseconds = Math.floor(time / 10);
    const minutes = Math.floor(totalCentiseconds / 6000);
    const seconds = Math.floor((totalCentiseconds % 6000) / 100);
    const centiseconds = totalCentiseconds % 100;

    this.minutes = this.formatTimePart(minutes);
    this.seconds = this.formatTimePart(seconds);
    this.centiseconds = this.formatTimePart(centiseconds);
  }

  private formatTimePart(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
