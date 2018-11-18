import { Action } from 'redux';
// import { AjaxCallState } from '../common/types';

// account-level state
export interface AccountState {
    AccountInfo: AccountInfo;
    AccountsList: Account[];
}

export interface AccountInfo {
    CustomerId: string;
    CustomerName: string;
    OpenDate: Date;
    CalculatedBalance: number;
}

export interface Account {
    Acc_ID?: string;
    Acc_Type: string;
    Class_Code: string;
    Openning_Balance: number;
    Acc_Number: string;
    CurrencyId: string;
    CustomerId: string;
    CurrencyName?: string;
    Status: boolean;
}

export interface NewAccountUpdatedInfo {
    newAccount: Account;
    addedBalance: number;
}

export interface ToggeledAccountData {
    addedBalance: number;
    Acc_ID: string;
    newState: boolean;
}

// actions types
export interface LoadAllAccountsByCustomerIdSuccess extends Action {
    type: 'LOAD_ALL_ACCOUNTS_BY_CUSTOMER_ID_SUCCESS';
    data: AccountState;
}

export interface CraeteAccountSuccess extends Action {
    type: 'CREATE_NEW_ACCOUNT_SUCCESS';
    data: NewAccountUpdatedInfo;
}

export interface ToggleAccountStatusSuccess extends Action {
    type: 'TOGGLE_ACCOUNT_STATUS_SUCCESS';
    data: ToggeledAccountData;
}

export type AccountAction = LoadAllAccountsByCustomerIdSuccess | CraeteAccountSuccess | ToggleAccountStatusSuccess;
