import { Reducer } from 'redux';
import { AjaxCallState, ajaxStatus, AjaxAction } from './types';

const initialState: AjaxCallState = {
    status: ajaxStatus.notStarted,
    info: '',
    component: ''
};

const reducer: Reducer<AjaxCallState> = (state: AjaxCallState = initialState, action: AjaxAction) => {
    switch (action.type) {
        case 'SET_AJAX_CALL_STATE':
            return { status: action.status, info: action.info, component: action.component };
        default:
            return state;
    }
};
export default reducer;