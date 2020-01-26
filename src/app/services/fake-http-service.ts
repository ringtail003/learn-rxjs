import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  get(id: string): Observable<ResponseValue> {
    console.log(`get('${id}') called.`);

    const value = this.find(id);

    if (!value) {
      const error: ResponseValue = {
        id,
        name: 'ERROR',
        delay: 3000,
      };

      return timer(error.delay).pipe(
        mergeMap(() => throwError(error)),
      );
    }

    return of(value).pipe(
      delay(value.delay),
    );
  }

  find(id: string): ResponseValue {
    return fakeValues.find((value) => value.id === id);
  }
}

export interface ResponseValue {
  id: string,
  name: string;
  delay: number,
}

const fakeValues: ResponseValue[] = [
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
];
