import * as api from '../../api/customersAccountsApiHelper';
import { Dispatch, ActionCreator } from 'redux';
import { AccountAction, AccountState, NewAccountUpdatedInfo, Account, ToggeledAccountData } from './types';
import { ThunkAction } from 'redux-thunk';
import { SetAjaxState } from '../ajaxRequest/actions';
import { ajaxStatus } from '../ajaxRequest/types';

export const loadAllAccountsSuccess: ActionCreator<AccountAction> =
    (data: AccountState) => ({ type: 'LOAD_ALL_ACCOUNTS_BY_CUSTOMER_ID_SUCCESS', data });

export const thunkLoadAllAccounts: ActionCreator<ThunkAction<void, AccountState, void>> =
    (customerId: string) => {
        return (dispatch: Dispatch<AccountState>) => {
            dispatch(SetAjaxState(ajaxStatus.started, 'started', 'accounts'));
            api.GetAccountsInfo(customerId).then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
                .then(data => {
                    dispatch(loadAllAccountsSuccess(data));
                    dispatch(SetAjaxState(ajaxStatus.success, 'success', 'accounts'));
                })
                .catch(err => dispatch(SetAjaxState(ajaxStatus.fail, err.message, 'accounts')));
        };
    };

export const addAccountSuccess: ActionCreator<AccountAction> =
    (data: NewAccountUpdatedInfo) => ({ type: 'CREATE_NEW_ACCOUNT_SUCCESS', data });

export const thunkAddAccount: ActionCreator<ThunkAction<void, AccountState, void>> =
    (account: Account) => {
        return (dispatch: Dispatch<AccountState>) => {
            dispatch(SetAjaxState(ajaxStatus.started, 'started', 'accountsNew'));
            api.createAccount(account).then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
                .then(data => {
                    dispatch(addAccountSuccess(data));
                    dispatch(SetAjaxState(ajaxStatus.success, 'success', 'accountsNew'));
                })
                .catch(err => dispatch(SetAjaxState(ajaxStatus.fail, err.message, 'accountsNew')));
        };
    };

export const toggleAccountSuccess: ActionCreator<AccountAction> =
    (data: ToggeledAccountData) => ({ type: 'TOGGLE_ACCOUNT_STATUS_SUCCESS', data });

export const thunkToggleAccountSuccess: ActionCreator<ThunkAction<void, AccountState, void>> =
    (accountId: string) => {
        return (dispatch: Dispatch<AccountState>) => {
            dispatch(SetAjaxState(ajaxStatus.started, 'started', accountId));
            api.toggleAccountState(accountId).then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
                .then(data => {
                    dispatch(toggleAccountSuccess(data));
                    dispatch(SetAjaxState(ajaxStatus.success, 'success', accountId));
                })
                .catch(err => dispatch(SetAjaxState(ajaxStatus.success, err.message, accountId)));
        };
    };