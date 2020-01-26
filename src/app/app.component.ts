import { Component } from '@angular/core';
import { FakeHttpService, FakeResponse, fakeResponses } from './services/fake-http-service';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of, EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list = fakeResponses.sort((a, b) => a.delay - b.delay);
  responses: any[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) {
  }

  mergeMap() {
    this.responses = [];

    from(['a', 'b', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id)),
      )
      .subscribe((value) => this.responses.push(value))
    ;
  }

  mergeMapWithContinue() {
    this.responses = [];

    from(['error', 'a', 'b', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => {
            return EMPTY;
          }),
        )),
      )
      .subscribe((value) => this.responses.push(value))
    ;
  }

  mergeMapWithSubscribe() {
    this.responses = [];

    from(['error', 'a', 'b', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => {
            return of(error);
          }),
        )),
      )
      .subscribe((value) => this.responses.push(value))
    ;
  }

  mergeMapWithAbort() {
    this.responses = [];

    from(['error', 'a', 'b', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => {
            return throwError('abort');
          }),
        )),
      )
      .subscribe((value) => this.responses.push(value))
    ;
  }
}
