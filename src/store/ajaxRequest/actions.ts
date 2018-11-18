import { AjaxAction, ajaxStatus } from './types';

export const SetAjaxState: (status: ajaxStatus, message: any, comp: string) => AjaxAction =
    (status: ajaxStatus, message: any, comp: string) => ({
        type: 'SET_AJAX_CALL_STATE',
        status: status,
        info: message,
        component: comp
    });