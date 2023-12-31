import { TEvent } from "./scheduler.types";

export type TAppointment = TEvent | {
    id: number;
    reference?: number;
    type: number;
    color: string;
    scheduler: number;
    scheduler_color: string;
    patient: number;
    text: string;
    data: TAppointment; // !!
    end_date: Date;
    start_date: Date;
    emergency: boolean;
    all_day: boolean;
    note: string;
    availability: number;
    priority: number;
    diffusion: number;
    category: number;
    first_app?: boolean; // prop for the front side only
    reason_duration?: number;
    [key: string]: any; // todo: delete
};

export type TDocument = {
    id: string;
    name: string;
    src: string;
    time: string;
    type: string;
};

export type TLabel = {
    id: string | number;
    name: string;
    selected: boolean;
    status: boolean;
    color: string;
    dark: string;
};

export type TMember = {
    id: string | number;
    avatar: string;
    name: string;
    selected: boolean;
    status: boolean;
    priority: TPriority;
};

export type TPriority = {
    reference: number;
    name: string;
    // todo ..
};
// "urgent" | "high" | "normal" | "low" | "none";

export type TAvailability = {};
export type TCategory = {};
export type TDiffusion = {};