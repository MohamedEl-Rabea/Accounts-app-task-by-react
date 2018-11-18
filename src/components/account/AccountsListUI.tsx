import * as React from 'react';
import { Account } from '../../store/accounts/types';
import { AjaxCallState, ajaxStatus } from '../../store/ajaxRequest/types';
export interface AccountInfoProps {
    ListOfAccounts: Account[];
    pageNumber: number;
    toggleStatus: (accoundId?: string) => void;
    ajaxStatus: AjaxCallState;
}

const AccountsList: (props: AccountInfoProps) => JSX.Element = (props) => {
    return (
        props.ListOfAccounts.length < 1 ?
            (
                <div className="alert alert-danger text-center alert-margin">
                    <strong>No accounts found!</strong>
                </div>
            )
            :
            (
                <table className="table table-accounts-margin">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Account Type</th>
                            <th>Class Code</th>
                            <th>Account Number</th>
                            <th>Balance</th>
                            <th>Currency</th>
                            <th />
                        </tr>
                        {
                            props.ListOfAccounts.map((acc, index) => {
                                return (
                                    <tr key={index} className={acc.Status ? '' : 'DeActivated'}>
                                        <td>{acc.Acc_ID}</td>
                                        <td>{acc.Acc_Type}</td>
                                        <td>{acc.Class_Code}</td>
                                        <td>{acc.Acc_Number}</td>
                                        <td>{acc.Openning_Balance}</td>
                                        <td>{acc.CurrencyName}</td>
                                        <td>
                                            {
                                                props.ajaxStatus.status === ajaxStatus.started && props.ajaxStatus.component === acc.Acc_ID ?
                                                    <div className="loaderRow" />
                                                    :
                                                    acc.Status ?
                                                        <input type="button" className="btn btn-sm btn-danger" onClick={() => props.toggleStatus(acc.Acc_ID)} data-name="btn-delete" value="Remove" />
                                                        :
                                                        <input type="button" className="btn btn-sm btn-success" onClick={() => props.toggleStatus(acc.Acc_ID)} data-name="btn-delete" value="Activate" />
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            )
    );
};

export default AccountsList;
