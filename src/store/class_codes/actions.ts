import { ActionCreator } from 'redux';
import { ClassCodeAction, ClassCode, ClassCodesState } from './types';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import * as api from '../../api/customersAccountsApiHelper';

export const getClassesCodesByAccTypeSuccess: ActionCreator<ClassCodeAction> =
    (codes: ClassCode[]) => ({
        type: 'GET_ALL_CLASSES_CODES_BY_ACC_TYPE_SUCCESS',
        data: codes
    });

export const thunkGetClassesCodesByAccTypeSuccess: ActionCreator<ThunkAction<void, ClassCodesState, void>> =
    (accType: string) => {
        return (dispatch: Dispatch<ClassCodesState>) => {
            
            api.loadAllClassCodes(accType).then(result => result.json())
                .then(data => dispatch(getClassesCodesByAccTypeSuccess(data)));
        };
    };