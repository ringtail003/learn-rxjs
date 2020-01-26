import { Component, OnInit } from '@angular/core';
import { forkJoin, EMPTY, of, throwError } from 'rxjs';
import { FakeHttpService, FakeResponse } from 'src/app/services/fake-http-service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.scss']
})
export class ForkJoinComponent implements OnInit {
  responses: FakeResponse[] = [];

  constructor(
    private fakeHttpService: FakeHttpService,
  ) { }

  ngOnInit() {
  }

  call() {
    this.responses = [];

    forkJoin([
      this.fakeHttpService.get('a'),
      this.fakeHttpService.get('b'),
      this.fakeHttpService.get('c'),
    ])
    .subscribe((responses) => this.responses = responses);
  }

  withContinue() {
    this.responses = [];

    forkJoin([
      this.fakeHttpService.get('error').pipe(
        catchError((err) => EMPTY),
      ),
      this.fakeHttpService.get('a'),
      this.fakeHttpService.get('b'),
      this.fakeHttpService.get('c'),
    ])
    .subscribe((responses) => this.responses = responses);
  }

  withSubscribe() {
    this.responses = [];

    forkJoin([
      this.fakeHttpService.get('error').pipe(
        catchError((err) => of(err)),
      ),
      this.fakeHttpService.get('a'),
      this.fakeHttpService.get('b'),
      this.fakeHttpService.get('c'),
    ])
    .subscribe((responses) => this.responses = responses);
  }

  withAbort() {
    this.responses = [];

    forkJoin([
      this.fakeHttpService.get('error').pipe(
        catchError((err) => throwError('abort')),
      ),
      this.fakeHttpService.get('a'),
      this.fakeHttpService.get('b'),
      this.fakeHttpService.get('c'),
    ])
    .subscribe((responses) => this.responses = responses);
  }

}
