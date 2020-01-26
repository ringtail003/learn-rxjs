import { Component, OnInit } from '@angular/core';
import { FakeHttpService, FakeResponse, responses } from '../../services/fake-http-service';
import { switchMap, catchError } from 'rxjs/operators';
import { scheduled, of, EMPTY, throwError, queueScheduler } from 'rxjs';

@Component({
  selector: 'switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {
  responses: FakeResponse[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) { }

  ngOnInit() {
  }

  call() {
    this.responses = [];

    scheduled(responses({ willError: false }), queueScheduler).pipe(
        switchMap((id) => this.fakeHttpService.get(id)),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withContinue() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        switchMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => EMPTY),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withSubscribe() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        switchMap((id) => this.fakeHttpService.get(id).pipe(
          catchError((error: FakeResponse) => of(error)),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

  withAbort() {
    this.responses = [];

    scheduled(responses({ willError: true }), queueScheduler).pipe(
        switchMap((id) => this.fakeHttpService.get(id).pipe(
          catchError(() => throwError('abort')),
        )),
      )
      .subscribe((response) => this.responses.push(response))
    ;
  }

}
