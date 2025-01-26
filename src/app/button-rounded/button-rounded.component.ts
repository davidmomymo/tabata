import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {WorkoutMode} from '../timer/timer-state.service';

@Component({
  selector: 'app-button-rounded',
  imports: [
    NgClass
  ],
  templateUrl: './button-rounded.component.html',
  styleUrl: './button-rounded.component.scss'
})
export class ButtonRoundedComponent {
  colorMode = input.required<WorkoutMode>();
  title = input.required<string>();
}
