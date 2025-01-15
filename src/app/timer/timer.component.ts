import {Component, input} from '@angular/core';
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
export class TimerComponent {
  currentTimerState$: Observable<TimerState>;
  constructor(private timerStateService: TimerStateService) {
    this.currentTimerState$ = this.timerStateService.timerState$;
  }

  startTimer(){
    this.timerStateService.startTimer();
  }
}
