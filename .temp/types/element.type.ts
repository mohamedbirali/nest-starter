import { Type } from "@angular/core";

export type TEventIcon = {
    name: string;
    cssClass: string;
    tooltip: string;
    [key: string]: any;
};

export type TElement = {
    ngComponent: Type<any>;
    tagName: string;
};