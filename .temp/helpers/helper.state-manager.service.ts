import { Injectable } from "@angular/core";

/**
 * @description This class can help when updating array's state 
 * for CRUD operations and using the BehaviorSubject() subject
 * @todo All entities should have PK as unique key @default 'reference'
 */

@Injectable(
    { providedIn: "root" }
)
export class HelperStateManagerService {
    constructor() {}

    create<N>(
        created: N,
        existingSate: N[],
    ): N[] {
        existingSate.push(created);
        return existingSate;
    }
    
    update<N>(
        updated: N, 
        existingSate: N[],
        primaryKey?: string,
    ): N[] {
        let PK = primaryKey ?? 'reference';
        return existingSate.map(
            (entity,) => {
                if(entity[PK] === updated[PK]) {
                    return updated;
                }
                return entity;
            }
        );
    }

    delete<N>(
        primaryKeyValue: string,
        existingSate: N[],
        primaryKey?: string
    ): N[] {
        let PK = primaryKey ?? 'reference';
        return existingSate.filter((entity) => +entity[PK] !== +primaryKeyValue);
    }
}