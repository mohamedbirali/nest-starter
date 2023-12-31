import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Type, inject } from "@angular/core";
import { eaDhtmlxInstance } from "@ea/functional/dtmlx.instance";

type TOverlay<T> = {
    input: {
        name: string;
        value: boolean | string | Record<string, any> | Record<string, any>[];
    },
    // data?: T;
}

@Injectable(
    { providedIn: "root" }
)
export class EaHelperOverlayService {
    private _overlay = inject(Overlay);
    private overlayRef: OverlayRef;

    private _eventId: string;
    private _eventPlanningRef: string;

    attachOverlay<N> (
        $eventDom: any, // toreview: string
        component: Type<any>,
        options?: TOverlay<N>,
        hasBackdrop = false
    ) {
        // 
        this._eventId = options.input.value["$event"]?.id ?? options.input.value["id"];
        this._eventPlanningRef = options.input.value['reference'];

        const positionStrategy =
            this._overlay
                .position()
                .flexibleConnectedTo($eventDom)
                .withFlexibleDimensions(false)
                .withPositions([
                    /**
                     * * * -
                     * * * *
                     */
                    {
                        originX: "end",
                        originY: "top",
                        overlayX: "start",
                        overlayY: "top",
                        offsetX: 8,
                    },
                    /**
                     * - * *
                     * * * *
                     */
                    {
                        originX: "start",
                        originY: "top",
                        overlayX: "end",
                        overlayY: "top",
                        offsetX: -8,
                    },
                    /**
                     * * * *
                     * - * *
                     */
                    {
                        originX: "start",
                        originY: "bottom",
                        overlayX: "end",
                        overlayY: "bottom",
                        offsetX: 8,
                    },
                    /**
                     * * * *
                     * * * -
                     */
                    {
                        originX: "end",
                        originY: "bottom",
                        overlayX: "start",
                        overlayY: "bottom",
                        offsetX: -8,
                    },
                ]);

        this.overlayRef = this._overlay.create({
            positionStrategy,
            hasBackdrop,
        });

        const planningOverlay = new ComponentPortal(component);
        this.overlayRef.attach(planningOverlay)
            .setInput(
                options.input.name,
                options.input.value
            );

        this.overlayRef.backdropClick().subscribe(() => {
            this._deleteEvent();
            this.overlayRef.detach();
        });
    }

    detachOverlay (ref?: string) {
        this._eventPlanningRef = ref;

        this._deleteEvent();

        this.overlayRef.detach();
    }

    private _deleteEvent<N> () {
        if (!this._eventPlanningRef)
            eaDhtmlxInstance().deleteEvent(this._eventId);
    }

}