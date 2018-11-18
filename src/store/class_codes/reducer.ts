import { Reducer } from 'redux';
import { ClassCodesState, ClassCodeAction } from './types';

const initialState: ClassCodesState = {
    ClassCodes: []
};

const reducer: Reducer<ClassCodesState> = (state: ClassCodesState = initialState, action: ClassCodeAction) => {
    switch (action.type) {
        case 'GET_ALL_CLASSES_CODES_BY_ACC_TYPE_SUCCESS':
            return { ClassCodes: action.data };
        default:
            return state;
    }
};

export default reducer;