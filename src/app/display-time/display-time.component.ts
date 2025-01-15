import {Component, input} from '@angular/core';

@Component({
  selector: 'app-display-time',
  imports: [],
  templateUrl: './display-time.component.html',
  styleUrl: './display-time.component.scss'
})
export class DisplayTimeComponent {
  startTime = input.required<number>();
}
