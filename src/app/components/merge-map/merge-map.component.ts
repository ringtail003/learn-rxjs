import { Component, OnInit } from '@angular/core';
import { FakeHttpService, FakeResponse, fakeResponses, responses } from '../../services/fake-http-service';
import { mergeMap, catchError } from 'rxjs/operators';
import { of, EMPTY, throwError, scheduled, queueScheduler } from 'rxjs';

@Component({
  selector: 'merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {
  responses: FakeResponse[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) { }

  ngOnInit() {
  }

  call() {
    this.responses = [];

    scheduled(responses({ willError: false }), queueScheduler).pipe(
        mergeMap((id) => this.fakeHttpService.get(id)),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withContinue() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => EMPTY),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withSubscribe() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => of(error)),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withAbort() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        mergeMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => throwError('abort')),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

}
