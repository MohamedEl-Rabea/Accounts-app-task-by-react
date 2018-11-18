import { Action } from 'redux';

export interface ClassCodesState {
    ClassCodes: ClassCode[];
}

export interface ClassCode {
    Id: string;
    Code: string;
}

export interface GetClassCodesByAccTypeSuccess extends Action {
    type: 'GET_ALL_CLASSES_CODES_BY_ACC_TYPE_SUCCESS';
    data: ClassCode[];
}

export type ClassCodeAction = GetClassCodesByAccTypeSuccess;