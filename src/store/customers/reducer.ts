import { CustomerState, CustomerAction } from './types';
import { Reducer } from 'redux';

const initialState: CustomerState = {
    customers: []
};

const reducer: Reducer<CustomerState> = (state: CustomerState = initialState, action: CustomerAction) => {
    switch (action.type) {
        case 'LOAD_ALL_CUSTOMERS_SUCCESS':
            return { ...state, customers: state.customers.concat(action.data) };
        default:
            return state;
    }
};

export default reducer;