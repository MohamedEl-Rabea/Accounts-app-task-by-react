import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/customersAccountsApiHelper';
import { Customer, CustomerAction, CustomerState } from './types';
import { Dispatch } from 'redux';
import { SetAjaxState } from '../ajaxRequest/actions';
import { ajaxStatus } from '../ajaxRequest/types';

export const LoadAllCustomersSuccess: ActionCreator<CustomerAction> =
    (data: Customer[]) => ({ type: 'LOAD_ALL_CUSTOMERS_SUCCESS', data: data });

export const AsyncLoadAllCustomers: ActionCreator<ThunkAction<void, CustomerState, void>>
    = () => {
        return (dispatch: Dispatch<CustomerState>) => {
            dispatch(SetAjaxState(ajaxStatus.started, 'started', 'customers'));
            api.loadAllCustomers()
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    } else {
                        return response.json();
                    }
                })
                .then(result => {
                    dispatch(LoadAllCustomersSuccess(result));
                    dispatch(SetAjaxState(ajaxStatus.success, 'started', 'customers'));
                })
                .catch(err => {
                    dispatch(SetAjaxState(ajaxStatus.fail, err.message, 'customers'));
                });
        };
    };