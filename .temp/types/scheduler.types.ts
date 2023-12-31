// todo: delete model folders in the app level
// import { Practice } from "app/models/practice.mdel";
// import { Reason } from "app/main/portal/scheduler/models/reason.model";
// import { Scheduler } from "app/main/portal/scheduler/models/scheduler.model";
import { TPatient } from "app/main/portal/patient-area/models/patient.model";
import { SchedulerStatic } from "dhtmlx-scheduler";
import { Observable } from "rxjs";
import { TAppointment, TPriority } from "./appointment.type";
import { EaString } from "@ea/core/form/dynamic/dynamic-form.interface";
import { Note } from "../components/note/note.model";
import { TPlanning, TTimeSlot } from "./planning.type";
import { TPractice } from "app/main/portal/users/models/practice.model";
import { TReason } from "app/main/portal/scheduler/models/reason.model";
import { TScheduler } from "app/main/portal/scheduler/models/scheduler.model";

/**
 * todo: not use "any" for typing
 */

export type TMode = {
    view: string;
    level: number;
    side_mode: string;
    side_opened: boolean;
    side_pin: boolean;
};

// ________________________________________ //
export type EaId = string | number;
export type EaNull = null | "" | undefined | -1;
export type EaPromise$<T> = Observable<Promise<T>>; // not used
export type TEaSchedulerStatic = SchedulerStatic & EaScheduler;
export type EaScheduler$ = Observable<TEaSchedulerStatic>;
export type SchedulerPatient = Partial<TPatient>;
export type EaSchedulerCallback = (...args: any[]) => any;
export type EaDate = string | Date;
export type EaGetters<T> = {
    [
        Property in keyof T as `get${Capitalize<string & Property>}`
    ]: () => T[Property];
};

export type TSchedulerMode = "calendar" | "minute" | "hour" | "day" | "month" | "year" | "week" | "fivedays" | "threedays";
export type TSchedulerFormat = "%l" | "%H:%i" | "%F" | "%Y-%m-%d %H:%i:%s" | "%Y-%m-%d %H:%i";
export type TDateFormat = "DD/MM/YYYY" | "HH:mm" | "HH:mm:ss" | "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD" | "ddd" | TSchedulerFormat;
export type TDateMinMax = { start_date: string; end_date: string };

export type TEaTimeHour = {
    hours: number;
    minutes: number;
    seconds?: number;
    ms?: number;
}

export type TEaDay = {
    day: number;
    month: number;
    year: number;
};

// todo: verify if optional or required
/**
 * appointment event or Planning event
 */
export type TEvent = {
    start_date?: string;
    end_date?: string;
    text?: string;
    [key: string]: any;
};

export type TEventHeader = {
    draft?: boolean;
    note?: boolean;
    is_web?: boolean;
    rdv_prive?: boolean;
    urgence?: boolean;
    [key: string]: any;
};

export type TMarkedTimeSpan = {
    days?: Array<number>;
    zones?: Array<number> | EaString;
    invert_zones?: boolean;
    css?: EaString;
    html?: string;
    type?: string;
    sections?: { unit: number; timeline: Array<number> };
    start_date?: EaDate;
    end_date?: EaDate;
};

// toReview
export type TSchedulerState = {
    mode?: string;
    date?: Date;
    min_date?: Date;
    max_date?: Date;
    editor_id?: string;
    lightbox_id?: string;
    new_event?: Date;
    select_id?: string;
    expanded?: boolean;
    drag_id?: string;
    drag_mode?: "move" | "resize" | "create" | "new-resize";
};

export type TDayInfo = {
    AbsenceID  : number;
    conges     : boolean
    date       : string; // yyyy-mm-dd
    dateSelect : string; // dd/mm/yyyy
    ferie      : boolean;
    fermer     : boolean;
    jour       : number; // +"2"
    note       : any; // note type
}

export type TSchedulerData = {
    times_slots?: Array<TTimeSlot>;
    notes?: Array<Note>; // todo: move this to TNote
    planning?: TPlanning; // notice import path
    practice?: TPractice; // toReview
    priorities?: Array<TPriority>;
    resultSets?: any; // this result contains Partial<Patient> & { results }
    reasons?: Array<TReason>;
    schedulers?: Array<TScheduler>;
    appointments?: Array<TAppointment>; // toReview
    // todo: types
    categories?: any;
    types?: any;
    reasonTypes?: any;
};

/**
 * contains all props doesn't exist on the SchedulerStatic
 */
type EaScheduler = {
    EaSchedulerInstance?: boolean;
    _mode?: TSchedulerMode;
    date?: {
        // 3
        threedays_start: EaSchedulerCallback;
        add_threedays: EaSchedulerCallback;
        // 5
        fivedays_start: EaSchedulerCallback;
        add_fivedays: EaSchedulerCallback;
    };
    templates?: {
        // 3
        threedays_date: string;
        threedays_scale_date: string;
        // 5
        fivedays_date: string;
        fivedays_scale_date: string;
    };
    config?: {
        start_time: string;
        end_time: string;
    };
    data?: TSchedulerData;
    locale?: {
        labels: {
            threedays_tab: string;
            fivedays_tab: string;
        }
    };
    [key: string]: any;
};