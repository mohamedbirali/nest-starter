import { Injectable } from '@angular/core';
import { phone } from 'phone';

@Injectable(
    { providedIn: "root" }
)
export class HelperPhoneService {
    constructor() {}

    getPhoneWithPrefix(
        tel: string, 
        country?: string
    ): string  {
        let phoneResult = phone(tel, {country, validateMobilePrefix: false, strictDetection: false});
        return phoneResult.isValid ?
            `(${phoneResult.countryCode}) ${phoneResult.phoneNumber.slice(phoneResult.countryCode.length)}` : 
            `${tel}!`;
    }

    getPhoneWithoutPrefix(value:  string | number,) {
        let gsm = String(value).split(' ');
        if(gsm.length > 1) {
            let prefix = gsm[0].slice(2, gsm[0].length - 1);
            value = `${prefix}${gsm[1]}`;
        } else {
            value = `${gsm}`;
        }
        return value;
    }
}