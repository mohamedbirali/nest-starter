import { IRequestApp } from '@bee/common/request';

export type TRequest = IRequestApp;
export type TRequestApp<T> = IRequestApp & { __entitity: T };
