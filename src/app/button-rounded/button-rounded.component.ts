import {Component, input} from '@angular/core';

@Component({
  selector: 'app-button-rounded',
  imports: [],
  templateUrl: './button-rounded.component.html',
  styleUrl: './button-rounded.component.scss'
})
export class ButtonRoundedComponent {
  title = input.required<string>();
}
