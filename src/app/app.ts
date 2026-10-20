import {Component} from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  template: `
    <app-home />
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}
