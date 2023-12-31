// import { Injectable } from "@angular/core";
import { FieldType } from "@ea/core/form/dynamic/dynamic-form.interface";
import { Field } from "@ea/core/form/dynamic/dynamic-form.interface";
import { sharedInputStyles } from "@ea/common/constant/styles.contant";
import { Observable, of } from "rxjs";

type BasicField = Pick<Field, "formControlName" | "inputType">;

/**
 * @description BETA
 */
export class EaAutoGenerateForm {

    /**
     * To quickly create basic forms: only required text inputs
     * @param fields 
     * @returns Field[]
     */
    static generateBasicTextForm(fields: BasicField[]): Observable<Field[]> {
        return of(fields.map(
            (field) => ({
                formControlName: field.formControlName,
                label: {
                    text: field.formControlName,
                },
                placeholder: field.formControlName,
                inputType: field.inputType,
                materialType: "none",
                type: FieldType.INPUT,
                cssClass: `${sharedInputStyles}`,
                validators_beta: ["required"]
            } as Field),
        ));
    }
}