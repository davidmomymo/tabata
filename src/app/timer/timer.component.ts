import {Component, OnInit} from '@angular/core';
import {DisplayTimeComponent} from '../display-time/display-time.component';
import {ButtonRoundedComponent} from '../button-rounded/button-rounded.component';
import {TimerState, TimerStateService} from './timer-state.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-timer',
  imports: [
    DisplayTimeComponent,
    ButtonRoundedComponent,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  currentTimerState$: Observable<TimerState>;

  constructor(private timerStateService: TimerStateService) {
    this.currentTimerState$ = this.timerStateService.timerState$;
  }

  ngOnInit(): void {
    this.timerStateService.setWorkoutMode('Workout');
  }

  runTimer() {
    this.timerStateService.runTimer();
  }

  stopTimer() {
    this.timerStateService.stopTimer();
  }

  restartTimer() {
    this.timerStateService.restartTimer();
  }
}
