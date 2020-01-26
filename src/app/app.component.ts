import { Component } from '@angular/core';
import { fakeResponses } from './services/fake-http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list = fakeResponses;

  constructor() {}
}
