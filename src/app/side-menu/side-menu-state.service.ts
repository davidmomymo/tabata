import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

export type SideMenuState = 'Settings' | 'Timer';

@Injectable({
  providedIn: 'root'
})
export class SideMenuStateService {
  private sideMenuStateSubject = new BehaviorSubject<SideMenuState>('Timer');
  public sideMenuState$ = this.sideMenuStateSubject.asObservable();

  constructor(private router: Router) {
  }

  async execute(){
    const currentState = this.sideMenuStateSubject.value;
    console.log(currentState);
    if (currentState === 'Timer') {
      this.setState('Settings')
      await this.router.navigate(['settings']);
    }
    else {
      this.setState('Timer');
      await this.router.navigate(['']);
    }
  }

  public setState(state: SideMenuState) {
    this.sideMenuStateSubject.next(state);
  }
}
