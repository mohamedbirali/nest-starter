import { Pipe, PipeTransform } from "@angular/core";
import { IColumn } from "@ea/common/ui/components/datasource/datasource";

/**
 * @description
 * THIS FILE CONTAINS 3 PIPES:
 * pipe 1: eaonetomany
 * pipe 2: eaonetoone
 * 
 * @todo refactor pipes to their own modules
 */

@Pipe({
    name: 'eaonetomany',
    pure: false,
    standalone: true
})
export class OneToManyPipe implements PipeTransform {
    transform(
        value: Object,
        numberOfProps?: number
    ) {
        return this._transform(value);
    }

    private _transform(object: Object, numberOfProps?: number): string {
        let _dataString = '';
        Object.keys(object).forEach(
            (key, index) => {
                // if(numberOfProps && index > numberOfProps) return
                if(index)
                    _dataString += `${object[key]} `;
            }
        );

        return _dataString.slice(0, _dataString.length-1);
    }

}

@Pipe({
    name: 'eaonetoone',
    pure: false,
    standalone: true
})
export class OneToOnePipe implements PipeTransform {
    transform<T>(
        _object: T,
        column: IColumn<T>,
    ): string {
        let element = '';
        let props = column.mechanism.oneToOne.props
        for (let i = 0; i < props.length; i++) {
            element += _object[props[i]];
        }
        
        return element;
    }

}
