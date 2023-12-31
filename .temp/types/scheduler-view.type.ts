import { EaString } from "@ea/core/form/dynamic/dynamic-form.interface";

/**
 * todo: refactor those types !
 */

export type TSchedulerViewType = {
    icon: string;
    type: "agenda" | "day" | "threedays" | "fivedays" | "week" | "month" | "year";
    label: string; // TViewType.type in french
    cssClass?: EaString;
};
export type TSchedulerIcon = {
    name: string;
    tooltip: string;
    nestedIcons?: TSchedulerIcon[];
};
export type TSchedulerDownloadIcon = {
    description: string;
    name: string;
};
export type TSchedulerLinkIcon = {
    link: string;
    icon: string;
    tooltip: string;
};