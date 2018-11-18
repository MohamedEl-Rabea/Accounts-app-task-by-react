import { ActionCreator } from 'redux';
import { CurrenciesAction, Currency, CurrencyState } from './types';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import * as api from '../../api/customersAccountsApiHelper';

export const getAllCurrenciesSuccess: ActionCreator<CurrenciesAction> =
    (data: Currency[]) => ({
        type: 'GET_ALL_CURRENCIES_SUCCESS',
        data
    });

export const thunkGetAllCurrencies: ActionCreator<ThunkAction<void, CurrencyState, void>> =
    () => {
        return (dispatch: Dispatch<CurrencyState>) => {
            api.loadAllCurrencies().then(result => result.json())
                .then(data => dispatch(getAllCurrenciesSuccess(data)));
        };
    };