import { createStore, combineReducers } from 'redux';
import { CustomerState } from './customers/types';
import customerReducer from './customers/reducer';
import { Reducer, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AccountState } from './accounts/types';
import { CurrencyState } from './currencies/types';
import { ClassCodesState } from './class_codes/types';
import AjaxReducer from './ajaxRequest/reducer';
import accountReducer from './accounts/reducer';
import currencyReducer from './currencies/reducer';
import classCodesReducer from './class_codes/reducer';
import { AjaxCallState } from './ajaxRequest/types';

export interface ApplicationState {
    customers: CustomerState;
    accounts: AccountState;
    currencies: CurrencyState;
    classCodes: ClassCodesState;
    ajaxCallState: AjaxCallState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers({
    customers: customerReducer,
    accounts: accountReducer,
    currencies: currencyReducer,
    classCodes: classCodesReducer,
    ajaxCallState: AjaxReducer
});

const store = createStore<ApplicationState>(rootReducer, applyMiddleware(thunk));

export default store;