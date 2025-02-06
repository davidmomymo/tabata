import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type WorkoutMode = 'Workout' | 'Rest' | 'Settings' | 'GetReady';
export type TimerMode = 'Start' | 'Running' | 'Stop';

export interface TimerState {
  currentTimeInSeconds: number;
  maxWorkoutTimeInSeconds: number;
  maxRestTimeInSeconds: number;
  maxGetReadyTimeInSeconds: number;
  currentWorkoutRounds: number;
  maxWorkoutRounds: number;
  workoutMode: WorkoutMode;
  timerMode: TimerMode;
  currentPercentage: number;
  getReady: boolean;
}

export interface TimerSettings {
  maxWorkoutTimeInSeconds: number;
  maxRestTimeInSeconds: number;
  maxWorkoutRounds: number;
}


@Injectable({
  providedIn: 'root'
})
export class TimerStateService {
  private maxWorkoutRounds = 10;
  private maxWorkoutTimeInSeconds = 45;
  private maxRestTimeInSeconds = 15;
  private maxGetReadyTimeInSeconds = 3;
  private currentWorkoutRounds = 0;
  private currentTimeInSeconds = 45;

  private initState: TimerState = {
    currentTimeInSeconds: this.currentTimeInSeconds,
    maxWorkoutTimeInSeconds: this.maxWorkoutTimeInSeconds,
    maxRestTimeInSeconds: this.maxRestTimeInSeconds,
    currentWorkoutRounds: this.currentWorkoutRounds,
    maxWorkoutRounds: this.maxWorkoutRounds,
    maxGetReadyTimeInSeconds: this.maxGetReadyTimeInSeconds,
    workoutMode: 'Workout',
    timerMode: 'Start',
    currentPercentage: 0,
    getReady: true
  }

  private intervalTimeInMilliseconds = 10;

  private getInitState(): TimerState {
    return {...this.initState};
  }

  getTimerState(): TimerState {
    return this.timerStateSubject.getValue();
  }

  private timerStateSubject = new BehaviorSubject<TimerState>(this.getInitState());
  timerState$ = this.timerStateSubject.asObservable();
  private currentTimeoutId?: ReturnType<typeof setInterval> = undefined;

  constructor() {
  }

  runTimer() {
    if (this.currentTimeoutId) {
      return;
    }

    const currentState = this.timerStateSubject.getValue();
    currentState.timerMode = 'Running';
    this.timerStateSubject.next(currentState);

    this.currentTimeoutId = setInterval(() => {
      this.manageCurrentWorkoutState(currentState);
    }, this.intervalTimeInMilliseconds);
  }

  private manageCurrentWorkoutState(currentState: TimerState) {
    if (this.shouldSwitchCurrentWorkoutMode(currentState)) {
      this.switchCurrentWorkoutMode(currentState);
    } else {
      this.decreaseCurrentTimeInSeconds();
    }
  }

  private shouldSwitchCurrentWorkoutMode(currentState: TimerState): boolean {
    return currentState.currentTimeInSeconds === 0 || currentState.currentTimeInSeconds < 0 || currentState.getReady;
  }

  private switchCurrentWorkoutMode(state: TimerState) {
    if (this.shouldSwitchToGetReady(state)) {
      this.switchToGetReady(state);
    } else if (this.shouldSwitchToRest(state)) {
      this.switchToRest(state);
    } else if (this.shouldSwitchToWorkout(state)) {
      this.switchToWorkout(state);
    } else {
      this.stopTimer();
    }
  }

  private shouldSwitchToWorkout(state: TimerState): boolean {
    return state.workoutMode === 'GetReady' || state.workoutMode === 'Rest' && state.currentWorkoutRounds !== state.maxWorkoutRounds
  }

  private shouldSwitchToRest(state: TimerState): boolean {
    return state.workoutMode === 'Workout' && state.currentWorkoutRounds !== state.maxWorkoutRounds
  }

  private shouldSwitchToGetReady(state: TimerState): boolean {
    return state.getReady;
  }

  switchToWorkout(state: TimerState) {
    state.currentWorkoutRounds += 1;
    state.currentTimeInSeconds = state.maxWorkoutTimeInSeconds;
    state.workoutMode = 'Workout';
    state.currentPercentage = 0;
  }

  switchToRest(state: TimerState) {
    state.workoutMode = 'Rest';
    state.currentTimeInSeconds = state.maxRestTimeInSeconds;
    state.currentPercentage = 0;
  }

  switchToGetReady(state: TimerState) {
    state.getReady = false;
    state.workoutMode = 'GetReady';
    state.currentTimeInSeconds = state.maxGetReadyTimeInSeconds;
    state.currentPercentage = 0;
  }

  private decreaseCurrentTimeInSeconds() {
    const currentState = this.timerStateSubject.getValue();
    currentState.currentTimeInSeconds -= this.intervalTimeInMilliseconds / 1000;
    currentState.currentPercentage = this.getCurrentPercentage(currentState);
    this.timerStateSubject.next(currentState);
  }

  private getCurrentPercentage(state: TimerState): number {
    switch (state.workoutMode) {
      case 'Workout': {
        return (state.maxWorkoutTimeInSeconds - state.currentTimeInSeconds) / state.maxWorkoutTimeInSeconds * 100;
      }
      case 'Rest': {
        return (state.maxRestTimeInSeconds - state.currentTimeInSeconds) / state.maxRestTimeInSeconds * 100;
      }
      case 'GetReady': {
        return (state.maxGetReadyTimeInSeconds - state.currentTimeInSeconds) / state.maxGetReadyTimeInSeconds * 100;
      }
      default: {
        throw 'Unknown Workout Mode'
      }

    }
  }

  stopTimer() {
    clearInterval(this.currentTimeoutId);
    this.currentTimeoutId = undefined;
    const currentState = this.timerStateSubject.getValue();
    currentState.timerMode = 'Stop';
    this.timerStateSubject.next(currentState);
  }

  restartTimer() {
    clearInterval(this.currentTimeoutId);
    this.currentTimeoutId = undefined;
    const initState = this.getInitState();
    console.log(initState);
    this.timerStateSubject.next(this.getInitState());
  }

  setSettings(timerSettings: TimerSettings) {
    /*const currentState = this.timerStateSubject.getValue();
    currentState.maxWorkoutRounds = timerSettings.maxWorkoutRounds;
    currentState.maxWorkoutTimeInSeconds = timerSettings.maxWorkoutTimeInSeconds;
    currentState.maxRestTimeInSeconds = timerSettings.maxRestTimeInSeconds;
    this.timerStateSubject.next(currentState);*/
    this.maxWorkoutRounds = timerSettings.maxWorkoutRounds;
    this.maxWorkoutTimeInSeconds = timerSettings.maxWorkoutTimeInSeconds;
    this.maxRestTimeInSeconds = timerSettings.maxRestTimeInSeconds;
    this.currentTimeInSeconds = timerSettings.maxWorkoutTimeInSeconds;
    this.updateInitState();
    this.restartTimer();
  }

  updateInitState() {
    this.initState = {
      currentTimeInSeconds: this.currentTimeInSeconds,
      maxWorkoutTimeInSeconds: this.maxWorkoutTimeInSeconds,
      maxRestTimeInSeconds: this.maxRestTimeInSeconds,
      maxGetReadyTimeInSeconds: this.maxGetReadyTimeInSeconds,
      currentWorkoutRounds: this.currentWorkoutRounds,
      maxWorkoutRounds: this.maxWorkoutRounds,
      workoutMode: 'Workout',
      timerMode: 'Start',
      currentPercentage: 0,
      getReady: true
    };
  }

  setWorkoutMode(workoutMode: WorkoutMode) {
    const currentState = this.timerStateSubject.getValue();
    this.timerStateSubject.next({...currentState, workoutMode: workoutMode});
  }
}
