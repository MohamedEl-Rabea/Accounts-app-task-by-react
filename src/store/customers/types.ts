import { Action } from 'redux';

export interface Customer {
    CustomerId: string;
    CustomerName: string;
    BranchCode: string;
    OpenDate: Date;
}

export interface CustomerState {
    customers: Customer[];
}

export interface LoadAllCustomersActionSuccess extends Action {
    type: 'LOAD_ALL_CUSTOMERS_SUCCESS';
    data: Customer[];
}

export type CustomerAction = LoadAllCustomersActionSuccess;