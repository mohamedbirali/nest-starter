// todo: move this to the app level
/**
 * Date types:
 * Lun. 10
 * mardi 11 juil. 2023
 * 2023-07-11 00:00:00
 */
export type TEaDateLocation =
    | "fr";

export type TEaDate = Date | string;

export type TEaDateFormat =
    | "DD/MM/YYYY"
    | "HH:mm"
    | "HH:mm:ss"
    | "ddd M MMM YYYY"
    | "YYYY-MM-DD HH:mm:ss"
    | "ddd MMM DD YYYY HH:mm:ss zz"
    | "dddd DD MMM YYYY"
    | "YYYY-MM-DD"
    | "M/DD/YYYY"
    | "ddd";

export type TEaSchedulerDateFormat =
    | "%l"
    | "%H:%i"
    | "%F"
    | "%Y-%m-%d %H:%i:%s"
    | "%Y-%m-%d %H:%i";