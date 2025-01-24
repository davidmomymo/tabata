import { Routes } from '@angular/router';
import {TimerComponent} from './timer/timer.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: TimerComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  }
];
