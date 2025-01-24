import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {SideMenuComponent} from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SideMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
