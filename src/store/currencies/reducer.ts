import { Reducer } from 'redux';
import { CurrencyState, CurrenciesAction } from './types';

const initialState: CurrencyState = {
    CurrenciesList: []
};

const reducer: Reducer<CurrencyState> = (state: CurrencyState = initialState, action: CurrenciesAction) => {
    switch (action.type) {
        case 'GET_ALL_CURRENCIES_SUCCESS':
            return { CurrenciesList: action.data };
        default:
            return state;
    }
};

export default reducer;