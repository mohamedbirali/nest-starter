import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
    { providedIn: "root" }
)
export class HelperHttpService {

    httpParams(data: Record<string, string | number | boolean>): HttpParams{
        let params = new HttpParams();

        Object.keys(data).forEach(
            (key) => {
                if(!!data[key] || data[key] === false) { // falsy should not be ignored
                    params = params.append(`${key}`, `${data[key]}`); // `` => string
                }
            }
        );

        return params;
    }
}
