import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type WorkoutMode = 'Workout' | 'Rest';
export type TimerMode = 'Start' | 'Running' | 'Stop';

export interface TimerState {
  currentTimeInSeconds: number;
  maxWorkoutTimeInSeconds: number;
  maxRestTimeInSeconds: number;
  currentWorkoutRounds: number;
  maxWorkoutRounds: number;
  workoutMode: WorkoutMode;
  timerMode: TimerMode;
  currentPercentage: number;
}


@Injectable({
  providedIn: 'root'
})
export class TimerStateService {
  private initState: TimerState = {
    currentTimeInSeconds: 45,
    maxWorkoutTimeInSeconds: 45,
    maxRestTimeInSeconds: 15,
    currentWorkoutRounds: 1,
    maxWorkoutRounds: 10,
    workoutMode: 'Workout',
    timerMode: 'Start',
    currentPercentage: 0
  }

  private intervalTimeInMilliseconds = 10;

  private getInitState(): TimerState {
    return {...this.initState};
  }

  private timerStateSubject= new BehaviorSubject<TimerState>(this.getInitState());
  timerState$ = this.timerStateSubject.asObservable();
  private currentTimeoutId?: ReturnType<typeof setInterval> = undefined;
  constructor() { }

  runTimer(){
    if(this.currentTimeoutId){
      return;
    }

    this.currentTimeoutId = setInterval(() => {
      this.manageCurrentWorkoutState()
    },this.intervalTimeInMilliseconds);
  }

  private manageCurrentWorkoutState(){
    const currentState = this.timerStateSubject.getValue();
    currentState.timerMode = 'Running';
    this.timerStateSubject.next(currentState);
    if (currentState.currentTimeInSeconds === 0 || currentState.currentTimeInSeconds < 0) {
      this.handleCurrentWorkoutMode(currentState);
    }
    else {
      this.decreaseCurrentTimeInSeconds();
    }
  }

  private getCurrentPercentage(state: TimerState): number {
    return state.workoutMode === 'Workout' ?
      (state.maxWorkoutTimeInSeconds - state.currentTimeInSeconds) / state.maxWorkoutTimeInSeconds * 100 :
      (state.maxRestTimeInSeconds - state.currentTimeInSeconds) / state.maxRestTimeInSeconds * 100;
  }

  private handleCurrentWorkoutMode(state: TimerState) {
    if (state.workoutMode === 'Workout' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.workoutMode = 'Rest';
      state.currentTimeInSeconds = state.maxRestTimeInSeconds;
      state.currentPercentage = 0;
    }
    else if (state.workoutMode === 'Rest' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.currentWorkoutRounds += 1;
      state.currentTimeInSeconds = state.maxWorkoutTimeInSeconds;
      state.workoutMode = 'Workout';
      state.currentPercentage = 0;
    }
    else {
      this.stopTimer();
    }
  }

  private decreaseCurrentTimeInSeconds(){
    const currentState = this.timerStateSubject.getValue();
    currentState.currentTimeInSeconds -= this.intervalTimeInMilliseconds / 1000 ;
    currentState.currentPercentage = this.getCurrentPercentage(currentState);
    this.timerStateSubject.next(currentState);
  }

  stopTimer(){
    clearInterval(this.currentTimeoutId);
    this.currentTimeoutId = undefined;
    const currentState = this.timerStateSubject.getValue();
    currentState.timerMode = 'Stop';
    this.timerStateSubject.next(currentState);
  }

  restartTimer(){
    clearInterval(this.currentTimeoutId);
    this.currentTimeoutId = undefined;
    this.timerStateSubject.next(this.getInitState());
  }
}
