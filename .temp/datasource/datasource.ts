export type IColumn<T> = {
    property: string;
    label: string;
    // refactor types
    type: 
        'text' | 'image' | 
         'stackAvatars' | 'color' |
        'checkbox' | 'button' | 
        'toggle' | 'oneToOne' | 
        'oneToMany' | 'contact';
    visible?: boolean;
    cssClasses?: string[];
    mechanism?: IColumnMechanism; 
}

export type IActionName = 'create' | 'edit' | 'detail' | 'delete';

export type IEmittedAction<T> = {
    actionName: IActionName;
    type?: T;
}

// toReview
// export type ISeparatedAction = {
//     name: IActionName;
//     icon: IIcon;
// }

export type IAction = {
    name: IActionName;
    events?: IEvent;
}

export type IToggle<T> = {
    rowType: T;
    checked: boolean;
    columnName: string;
}

// helpers not exported

type IColumnMechanism = {
    /**
     * A column getting a table of objects
     */
    oneToMany?: {
        /**
         * if not set iterate all props
         *  */
        props?: string[] | '*'; 
    },
    /**
     * @description A column need to combine more than one property
     * @example A column with name property should combine two properties firt and last name
     * merge : {
     *      merging: true,
     *      props: ["firstName", "lastName"]
     * }
     */
    merge?: {
        props: string[];
        separator?: string;
    },
    /**
     * An object column needs a specific property or many properties
     */
    oneToOne?: {
        /**
         * if props not null then its a one to one relationship
         */
        props: string[];
    }

}

type IEvent = {
    label: ILabel;
    icon: IIcon;
}

// add others if exists
type ILabel = 'Éditer' | 'Détails' | 'Supprimer';
type IIcon = {
    name: string;
    color?: string;
}