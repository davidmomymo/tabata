import { Component } from '@angular/core';
import {DisplayTimeComponent} from '../display-time/display-time.component';
import {ButtonRoundedComponent} from '../button-rounded/button-rounded.component';

@Component({
  selector: 'app-timer',
  imports: [
    DisplayTimeComponent,
    ButtonRoundedComponent
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

}
