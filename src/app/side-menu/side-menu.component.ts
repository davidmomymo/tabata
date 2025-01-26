import { Component } from '@angular/core';
import {SideMenuState, SideMenuStateService} from './side-menu-state.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {Observable} from 'rxjs';
import {TimerState, TimerStateService} from '../timer/timer-state.service';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-side-menu',
  imports: [
    AsyncPipe,
    FaIconComponent,
    NgClass
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
    await this.sideMenuStateService.execute();
  }

  protected readonly faClock = faClock;
  protected readonly faGear = faGear;
}
