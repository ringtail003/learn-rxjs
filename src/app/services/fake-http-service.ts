import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  get(id: string): Observable<FakeResponse> {
    console.log(`get('${id}') called.`);

    const value = this.find(id);

    if (value.id === 'error') {
      return timer(value.delay).pipe(
        mergeMap(() => throwError(value)),
      );
    }

    return of(value).pipe(
      delay(value.delay),
    );
  }

  find(id: string): FakeResponse {
    return fakeResponses.find((value) => value.id === id);
  }
}

export interface FakeResponse {
  id: string,
  name: string;
  delay: number,
}

export const fakeResponses: FakeResponse[] = [
  {
    id: 'a',
    name: 'A',
    delay: 2000,
  },
  {
    id: 'b',
    name: 'B',
    delay: 4000,
  },
  {
    id: 'c',
    name: 'C',
    delay: 0,
  },
  {
    id: 'error',
    name: 'ERROR',
    delay: 1000,
  },
];
