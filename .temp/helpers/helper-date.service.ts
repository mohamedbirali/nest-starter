import { Injectable } from "@angular/core";
import moment from "moment";
import { TEaDate, TEaDateFormat, TEaDateLocation } from "../types/date.type";
import { EaDate, TEaDay, TEaTimeHour } from "../types/scheduler.types";

// todo: move this to the app level
const DOTS = ":";
const _6 = "-";

@Injectable(
  { providedIn: "root" } // temporary: for tests
)
export class HelperDateService { // todo: interface
  private _getMoment (...date: string[] | any[]) {
    return moment(...date);
  }

  addDaysToDate (date: string, numberOfDays: number, format: TEaDateFormat = "YYYY-MM-DD") {
    return this._getMoment(date)
      .add(numberOfDays, 'd')
      .format(format);
  }

  getDayOfWeek (date: string): number {
    return + this._getMoment(date).day();
  }

  stringToDate (date: string): Date {
    const [day, month, year] = this._getMoment(date).format("DD/MM/yyyy").split("/");
    return new Date([month, day, year ?? 2023].join('/'));
  }

  objectToTime (odate: TEaTimeHour): string {
    return `${this._isAddZeroPrefix(odate.hours)}${DOTS}${this._isAddZeroPrefix(odate.minutes)}${DOTS}${this._isAddZeroPrefix(odate.seconds)}`;
  }

  objectToDay (oday: TEaDay) {
    return `${oday.year}${_6}${this._isAddZeroPrefix(oday.month + 1)}${_6}${this._isAddZeroPrefix(oday.day)}`;
  }

  #_numberToTime /* todo*/ (hour: number) {
    return `${hour}:00:00`;
  }

  convertToFrenchDate (date: string): string {
    return this._getMoment(date).locale('fr').format('dddd DD MMM YYYY');
  }

  convertToLargeFormat (
    date: TEaDate,
    currentFormat: TEaDateFormat,
    transformedFormat: TEaDateFormat,
    location: TEaDateLocation = "fr",
  ): string {

    return this._getMoment(date, currentFormat)
      .locale(location)
      .format(transformedFormat);
  }

  convertToDayOfWeek (
    // todo: delete
    date: TEaDate,
    format: TEaDateFormat,
    location: TEaDateLocation = "fr",
  ): string {
    return this._getMoment(date)
      .locale(location)
      .format(format);
  }

  convertToFormat (
    param: EaDate,
    currentFormat: TEaDateFormat,
    convertedFormat: TEaDateFormat,
  ): string {
    return this._getMoment(param, currentFormat)
      .locale("fr")
      .format(convertedFormat);
  }

  convertDateFormat (date: Date | string, format: TEaDateFormat, location = 'fr') {
    return this._getMoment(date).locale(location).format(format);
  }

  getHourFromDate (date: string): Date {
    const hoursAndMinutes: Array<string> =
      this._getMoment(date).format("hh:mm:ss").split(":");

    return new Date(
      new Date().setHours(+hoursAndMinutes[0], +hoursAndMinutes[1], 0)
    );
  }

  getDateFromHour (time: string): number {
    const _time = time.split(":");
    return new Date().setHours(+_time[0], +_time[1], 0);
  }

  // ============= //
  addMonths (date: EaDate, diff: number): number {
    const _date = new Date(date);
    return _date.setMonth(_date.getMonth() + diff);
  }

  // ============= //
  getDifferenceInSeconds (dateStart: Date, dateEnd: Date) {
    const _start = this._getMoment(dateStart);
    const _end = this._getMoment(dateEnd);
    return Math.abs(
      _start.diff(_end, "seconds")
    );
  }

  getDifferenceInHours (dateStart: Date, dateEnd: Date) {
    const _start = this._getMoment(dateStart);
    const _end = this._getMoment(dateEnd);
    return Math.abs(
      _start.diff(_end, "hours")
    );
  }

  private _isAddZeroPrefix (_number: number): string {
    return _number < 10 ? `0${_number}` : `${_number}`;
  }
}
