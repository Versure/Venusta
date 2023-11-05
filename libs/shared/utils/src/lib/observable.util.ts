﻿import { filter, Observable } from 'rxjs';

function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined;
}

/**
 * Omit all undefined values from an observable
 * @param source$
 * @returns
 */
export function filterDefined<T>(source$: Observable<T>): Observable<NonNullable<T>>{
  return source$.pipe(filter(isDefined));
}
