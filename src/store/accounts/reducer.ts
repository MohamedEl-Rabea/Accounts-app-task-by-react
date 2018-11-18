import { AccountState, AccountAction } from './types';
import { Reducer } from 'redux';

const initialState: AccountState = {
    AccountInfo: {
        CustomerId: '0',
        CustomerName: '',
        OpenDate: new Date(),
        CalculatedBalance: 0
    },
    AccountsList: [],
};

const reducer: Reducer<AccountState> = (state: AccountState = initialState, action: AccountAction) => {
    switch (action.type) {
        case 'LOAD_ALL_ACCOUNTS_BY_CUSTOMER_ID_SUCCESS':
            return action.data;
        case 'CREATE_NEW_ACCOUNT_SUCCESS':
            return {
                ...state,
                AccountInfo: {
                    ...state.AccountInfo,
                    CalculatedBalance: state.AccountInfo.CalculatedBalance + action.data.addedBalance
                },
                AccountsList: state.AccountsList.concat(action.data.newAccount)
            };
        case 'TOGGLE_ACCOUNT_STATUS_SUCCESS':
            let accIndex = state.AccountsList.findIndex(acc => acc.Acc_ID === action.data.Acc_ID);
            let NewList = state.AccountsList; // follow immutabilty behavior
            NewList[accIndex].Status = action.data.newState;
            return {
                ...state,
                AccountInfo: {
                    ...state.AccountInfo,
                    CalculatedBalance: state.AccountInfo.CalculatedBalance + action.data.addedBalance
                },
                AccountsList: NewList
            };
        default:
            return state;
    }
};

export default reducer;