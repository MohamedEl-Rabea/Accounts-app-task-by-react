import * as React from 'react';
import { Currency } from '../../store/currencies/types';
import { ClassCode } from '../../store/class_codes/types';
import { Account } from '../../store/accounts/types';

export interface AccountInputForm {
    currencies: Currency[];
    classCodes: ClassCode[];
    onAccTypeChange: (e: any) => void;
    onTextChange: (e: any) => void;
    onAddBtnClick: () => void;
    account: Account;
    errMsgs: string[];
}

const AccountInputForm: (props: AccountInputForm) => JSX.Element = (props) => {
    return (
        <table id="tblInputs">
            <tbody>
                <tr>
                    <td>
                        <strong>Account Type:</strong>
                    </td>
                    <td>
                        <select onChange={props.onAccTypeChange} value={props.account.Acc_Type} name="Acc_Type" className="custom-select">
                            <option value="-1">Select type</option>
                            <option value="CK">CK</option>
                            <option value="SV">SV</option>
                            <option value="CD">CD</option>
                        </select>
                    </td>
                    <td>
                        <strong>Class Code:</strong>
                    </td>
                    <td>
                        <select className="custom-select" name="Class_Code" value={props.account.Class_Code} onChange={props.onTextChange}>
                            <option value="-1">Selected code</option>
                            {
                                props.classCodes.map((classCode, index) => {
                                    return (
                                        <option key={index} value={classCode.Code}>{classCode.Code}</option>
                                    );
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <strong>Currency:</strong>
                    </td>
                    <td>
                        <select onChange={props.onTextChange} value={props.account.CurrencyId} name="CurrencyId" className="custom-select">
                            <option value="-1">Selected currency</option>
                            {props.currencies.map((currency, index) => {
                                return (
                                    <option key={index} value={currency.CurrencyId}>{currency.CurrencyName}</option>
                                );
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Acc_Number:</strong>
                    </td>
                    <td className="input-group">
                        <input type="text" maxLength={12} value={props.account.Acc_Number} name="Acc_Number" data-type="inputForm" onChange={props.onTextChange} placeholder="Accpount number" />
                    </td>
                    <td>
                        <strong>Balance:</strong>
                    </td>
                    <td className="input-group">
                        <input type="text" datatype="double" value={props.account.Openning_Balance} name="Openning_Balance" data-type="inputForm" onChange={props.onTextChange} placeholder="Start balance" />
                    </td>
                </tr>
                <tr>
                    <td colSpan={6} className="text-center">
                        <br />
                        <input type="button" value="Add" onClick={props.onAddBtnClick} className="btn btn-success btn-sm" />
                    </td>
                </tr>
                <tr >
                    <td colSpan={6} className="text-center">
                        <div className={'alert alert-danger text-center alert-margin ' + (props.errMsgs.length > 0 ? '' : 'noDisplay')}>
                            {
                                props.errMsgs.map((err, index) => {
                                    return (
                                        <div key={index}>
                                            <strong key={index}>{err}</strong>
                                            <br />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default AccountInputForm;
