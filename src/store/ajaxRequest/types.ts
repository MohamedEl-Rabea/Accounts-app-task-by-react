import { Action } from 'redux';

export enum ajaxStatus {
    notStarted = 'not started',
    started = 'started',
    success = 'success',
    fail = 'fail'
}

export interface AjaxCallState {
    status: ajaxStatus;
    info: any;
    component: string;
}

export interface AjaxAction extends Action {
    type: 'SET_AJAX_CALL_STATE';
    status: ajaxStatus;
    info: any;
    component: string;
}