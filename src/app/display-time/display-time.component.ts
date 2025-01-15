import {Component, input, ModuleWithProviders} from '@angular/core';
import {TimerState} from '../timer/timer-state.service';
import {NgClass} from '@angular/common';
import {NgCircleProgressModule} from 'ng-circle-progress';

@Component({
  selector: 'app-display-time',
  imports: [
    NgClass, NgCircleProgressModule
  ],
  providers: [
    (NgCircleProgressModule.forRoot({}) as ModuleWithProviders<NgCircleProgressModule>).providers!,
  ],
  templateUrl: './display-time.component.html',
  styleUrl: './display-time.component.scss'
})
export class DisplayTimeComponent {
  timerState = input.required<TimerState>();
}
