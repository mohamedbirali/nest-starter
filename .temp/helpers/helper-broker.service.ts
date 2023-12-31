import { Injectable } from "@angular/core";

@Injectable(
    { providedIn: "root" }
)
export class HelperBrokerService {
    transform<N, R>(
        data: N,
        broker: Record<string, string>,
    ): R {
        let transformed: R = {} as R;
        Object.keys(broker).forEach(
            (key) => {
                transformed[key] = data[broker[key]];
            }
        );
        return transformed;
    }
}