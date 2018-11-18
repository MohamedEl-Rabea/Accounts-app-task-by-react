import { Action } from 'redux';

// Currencies-lvel state
export interface CurrencyState {
    CurrenciesList: Currency[];
}

export interface Currency {
    CurrencyId: string;
    CurrencyName: string;
}

export interface GetAllCurrenciesSuccess extends Action {
    type: 'GET_ALL_CURRENCIES_SUCCESS';
    data: Currency[];
}

export type CurrenciesAction = GetAllCurrenciesSuccess;