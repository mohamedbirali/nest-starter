import { TDayInfo } from "./scheduler.types";

export type TPlanning = {
    authorised_time : number;
    start_hour: string;
    end_hour: string;
    ref_conf: number;
    step: any;
    step_time: any;
    times_slots_count: number;
    times_block: TTimeBlock[];
    times_slots: TTimeSlot[];
    infos: TDayInfo[];
};

export type TTimeBlock = {
    date: any;
    day: number;
    decimal_end_hour: number;
    decimal_start_hour : number;
    end_hour: any;
    is_close: boolean;
    start_hour: any;
};

export type TTimeSlot = {
    all_days           ?: string | number;
    color              ?: string;
    date               ?: string;
    day                ?: number | string;
    decimal_end_hour   ?: number;
    decimal_start_hour ?: number;
    end_hour           ?: string | number;
    reference          ?: number;
    selected_date      ?: string;
    selected_days      ?: number; // toReview
    shared_web         ?: boolean;
    start_hour         ?: string | number;
    time_slot_type     ?: string;
    text               ?: string;
    start_date         ?: Date;
    end_date           ?: Date;
    type               ?: string;
    id                 ?: string;
    emergency?: boolean;
};
