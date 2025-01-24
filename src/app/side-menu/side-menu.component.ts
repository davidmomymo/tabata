import { Component } from '@angular/core';
import {SideMenuState, SideMenuStateService} from './side-menu-state.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {TimerState, TimerStateService} from '../timer/timer-state.service';
import {ButtonRoundedComponent} from '../button-rounded/button-rounded.component';

@Component({
  selector: 'app-side-menu',
  imports: [
    AsyncPipe,
    ButtonRoundedComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  sideMenuState$: Observable<SideMenuState>;
  timerState$: Observable<TimerState>;

  constructor(private sideMenuStateService: SideMenuStateService, private timerStateService: TimerStateService) {
    this.sideMenuState$ = sideMenuStateService.sideMenuState$;
    this.timerState$ = timerStateService.timerState$;
  }
  async executeSideButton(): Promise<void> {
    await this.sideMenuStateService.switchState();
  }
}
