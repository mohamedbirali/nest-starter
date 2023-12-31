import { Observable } from 'rxjs';

// types
export type TPromise$<T> = Observable<T | null>;
export type TPromise<T> = Promise<T | null>;
export type TEntityCreate<T> = Omit<T, 'id'>;
export type TEntityUpdate<T> = Partial<T>;

export type TRecordNever = Record<string, never>;
export type TRecordString = Record<string, string>;
export type TRecordAny = Record<string, any>;

// db
export type TCount = { count: number };
