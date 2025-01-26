import {Component, OnInit} from '@angular/core';
import {TimerSettings, TimerState, TimerStateService} from '../timer/timer-state.service';
import {ButtonRoundedComponent} from '../button-rounded/button-rounded.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SettingsFieldComponent} from '../settings-field/settings-field.component';
import {SideMenuStateService} from '../side-menu/side-menu-state.service';

@Component({
  selector: 'app-settings',
  imports: [
    ButtonRoundedComponent,
    FormsModule,
    ReactiveFormsModule,
    SettingsFieldComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  timerSettings!: TimerSettings;
  timerState!: TimerState;
  form!: FormGroup;

  constructor(private timerStateService: TimerStateService, private formBuilder: FormBuilder, private sideMenuService: SideMenuStateService) {

  }

  ngOnInit(): void {
    this.timerStateService.setWorkoutMode('Settings');
    this.sideMenuService.setState('Settings');
    const timerState = this.timerStateService.getTimerState();
    this.timerState = timerState;
    this.form = this.formBuilder.group(
      {
        maxWorkoutRounds: this.formBuilder.control(timerState.maxWorkoutRounds, [Validators.required]),
        maxWorkoutTimeInSeconds: this.formBuilder.control(timerState.maxWorkoutTimeInSeconds, [Validators.required]),
        maxRestTimeInSeconds: this.formBuilder.control(timerState.maxRestTimeInSeconds, [Validators.required])
      }
    );
    this.timerSettings = {
      maxWorkoutTimeInSeconds: timerState.maxWorkoutTimeInSeconds,
      maxWorkoutRounds: timerState.maxWorkoutRounds,
      maxRestTimeInSeconds: timerState.maxRestTimeInSeconds,
    };
  }

  async save() {
    const res: TimerSettings = {
      maxRestTimeInSeconds: this.form.get('maxRestTimeInSeconds')?.value,
      maxWorkoutRounds: this.form.get('maxWorkoutRounds')?.value,
      maxWorkoutTimeInSeconds: this.form.get('maxWorkoutTimeInSeconds')?.value,
    }
    this.timerStateService.setSettings(res);
    await this.sideMenuService.execute();
  }
}
