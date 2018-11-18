import * as React from 'react';
import { Customer } from '../../store/customers/types';
import { NavLink } from 'react-router-dom';
import { ajaxStatus, AjaxCallState } from '../../store/ajaxRequest/types';

export interface CustomersUIProps {
    onChange: (e: any) => void;
    onClick: (e: any, id: string) => void;
    filterdCustomers: Customer[];
    ajaxState: AjaxCallState;
}

const CustomersUI: (props: CustomersUIProps) => JSX.Element = (props: CustomersUIProps) => {
    return (
        <div className="col-sm-4">
            <div className="input-group">
                <input type="text" onChange={props.onChange} className="form-control searchInput" placeholder="Search by customer name or RIM" data-name="name" />
            </div>
            <ul className="list-group customers-list">
                {
                    props.filterdCustomers.length < 1 && props.ajaxState.status === ajaxStatus.success ?
                        <li className="list-group-item list-group-item-danger text-center">
                            <div>
                                <strong>No result found!</strong>
                            </div>
                        </li>
                        :
                        props.ajaxState.status === ajaxStatus.fail && props.ajaxState.component === 'customers' ?
                            <li className="list-group-item list-group-item-danger text-center">
                                <div>
                                    <strong>{props.ajaxState.info}</strong>
                                </div>
                            </li>
                            :
                            props.ajaxState.status === ajaxStatus.started && props.ajaxState.component === 'customers' ?
                                <li className="list-group-item text-center">
                                    <div className="loaderSmall" />
                                </li>
                                :
                                props.filterdCustomers.map((customer, index) => {
                                    return (
                                        <li value={customer.CustomerId} key={customer.CustomerId} className="list-group-item list-group-item-action">
                                            <NavLink value={customer.CustomerId} onClick={(event: any, id: string) => props.onClick(event, customer.CustomerId)} to={'/accounts/' + customer.CustomerId} data-name="listItem" href="#">
                                                <div>
                                                    <strong>Customer name: {customer.CustomerName}</strong>
                                                </div>
                                                <div>
                                                    <small>Customer number: {customer.CustomerId}</small>
                                                </div>
                                                <small>Branch: {customer.BranchCode}</small>
                                            </NavLink>
                                        </li>);
                                })
                }
            </ul>
        </div>
    );
};

export default CustomersUI;