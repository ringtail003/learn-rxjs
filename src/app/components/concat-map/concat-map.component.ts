import { Component, OnInit } from '@angular/core';
import { FakeHttpService, FakeResponse, responses } from '../../services/fake-http-service';
import { concatMap, catchError } from 'rxjs/operators';
import { of, EMPTY, throwError, queueScheduler, scheduled } from 'rxjs';

@Component({
  selector: 'concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {
  responses: FakeResponse[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) { }

  ngOnInit() {
  }

  call() {
    this.responses = [];

    scheduled(responses({ willError: false }), queueScheduler).pipe(
        concatMap((id) => this.fakeHttpService.get(id)),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withContinue() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        concatMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => EMPTY),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withSubscribe() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        concatMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => of(error)),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withAbort() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        concatMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => throwError('abort')),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

}
