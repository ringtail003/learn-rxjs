import { Component } from '@angular/core';
import { FakeHttpService, ResponseValue } from './services/fake-http-service';
import { mergeMap, catchError } from 'rxjs/operators';
import { from, of, EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  values: any[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) {
  }

  mergeMap() {
    this.values = [];

    from(['a', 'b', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id)),
      )
      .subscribe((value) => this.values.push(value))
    ;
  }

  mergeMapWithError() {
    this.values = [];

    from(['a', 'b', 'error', 'c']).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          // catchError((error: ResponseValue) => of(error)),
          // catchError(() => EMPTY),
          // catchError(() => of()),
          catchError((error) => {
            console.log(error);
            // return EMPTY;
            // return of(error);
            return throwError('hoge');
          }),
        )),
      )
      .subscribe((value) => this.values.push(value))
    ;
  }
}
