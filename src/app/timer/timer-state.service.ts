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
}


@Injectable({
  providedIn: 'root'
})
export class TimerStateService {
  private initState: TimerState = {
    currentTimeInSeconds: 5,
    maxWorkoutTimeInSeconds: 5,
    maxRestTimeInSeconds: 3,
    currentWorkoutRounds: 1,
    maxWorkoutRounds: 3,
    workoutMode: 'Workout',
    timerMode: 'Start'
  }

  private getInitState(): TimerState {
    return {...this.initState};
  }

  private timerStateSubject= new BehaviorSubject<TimerState>(this.getInitState());
  timerState$ = this.timerStateSubject.asObservable();
  private currentTimeoutId?: ReturnType<typeof setInterval> = undefined;
  constructor() { }

  runTimer(){
    if(this.currentTimeoutId){
      console.log('current Timeout Id existing');
      return;
    }

    this.currentTimeoutId = setInterval(() => {
      this.manageCurrentWorkoutState()
    },1000);
  }

  private manageCurrentWorkoutState(){
    const currentState = this.timerStateSubject.getValue();
    console.log('current State', currentState);
    currentState.timerMode = 'Running';
    this.timerStateSubject.next(currentState);
    if (currentState.currentTimeInSeconds === 0) {
      this.handleCurrentWorkoutMode(currentState);
    }
    else {
      this.decreaseCurrentTimeInSeconds();
    }
  }

  private handleCurrentWorkoutMode(state: TimerState) {
    if (state.workoutMode === 'Workout' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.workoutMode = 'Rest';
      state.currentTimeInSeconds = state.maxRestTimeInSeconds;
    }
    else if (state.workoutMode === 'Rest' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.currentWorkoutRounds += 1;
      state.currentTimeInSeconds = state.maxWorkoutTimeInSeconds;
      state.workoutMode = 'Workout';
    }
    else {
      this.stopTimer();
    }
  }

  private decreaseCurrentTimeInSeconds(){
    const currentState = this.timerStateSubject.getValue();
    currentState.currentTimeInSeconds = currentState.currentTimeInSeconds -1;
    this.timerStateSubject.next(currentState);
  }

  private setCurrentTimeInSeconds(currentTimeInSeconds: number) {
    const currentState = this.timerStateSubject.getValue();
    currentState.currentTimeInSeconds = currentTimeInSeconds;
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
