import {Component, input} from '@angular/core';
import {TimerState} from '../timer/timer-state.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-display-time',
  imports: [
    NgClass
  ],
  templateUrl: './display-time.component.html',
  styleUrl: './display-time.component.scss'
})
export class DisplayTimeComponent {
  timerState = input.required<TimerState>();
}
