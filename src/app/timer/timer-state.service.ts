import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type WorkoutMode = 'Workout' | 'Rest';

export interface TimerState {
  currentTimeInSeconds: number;
  maxWorkoutTimeInSeconds: number;
  maxRestTimeInSeconds: number;
  currentWorkoutRounds: number;
  maxWorkoutRounds: number;
  mode: WorkoutMode;
}


@Injectable({
  providedIn: 'root'
})
export class TimerStateService {
  private getStartState: TimerState = {
    currentTimeInSeconds: 5,
    maxWorkoutTimeInSeconds: 5,
    maxRestTimeInSeconds: 3,
    currentWorkoutRounds: 1,
    maxWorkoutRounds: 3,
    mode: 'Workout'
  }

  private timerStateSubject= new BehaviorSubject<TimerState>(this.getStartState);
  timerState$ = this.timerStateSubject.asObservable();
  private currentTimeoutId?: ReturnType<typeof setInterval> = undefined;
  constructor() { }

  startTimer(){
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
    if (currentState.currentTimeInSeconds === 0) {
      this.handleCurrentMode(currentState);
    }
    else {
      this.decreaseCurrentTimeInSeconds();
    }
  }

  private handleCurrentMode(state: TimerState) {
    if (state.mode === 'Workout' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.mode = 'Rest';
      state.currentTimeInSeconds = state.maxRestTimeInSeconds;
    }
    else if (state.mode === 'Rest' && state.currentWorkoutRounds !== state.maxWorkoutRounds) {
      state.currentWorkoutRounds += 1;
      state.currentTimeInSeconds = state.maxWorkoutTimeInSeconds;
      state.mode = 'Workout';
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
  }
}
