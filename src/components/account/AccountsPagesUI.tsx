import * as React from 'react';

export interface AccountInfoProps {
    TotalAccounts: number;
    currentPage: number;
    onPageIndexChange: (e: any) => void;
    onCreateNewAccount: () => void;
}

const AccountsPages: (props: AccountInfoProps) => JSX.Element = (props) => {
    let BtnList: JSX.Element[] = [];
    let index = 1;
    for (index; index <= props.TotalAccounts / 3; index++) {
        BtnList.push(<input onClick={props.onPageIndexChange} type="button" key={index} value={index} className="btn btn-sm btn-page" />);
    }
    if (props.TotalAccounts % 3 > 0) {
        BtnList.push(<input onClick={props.onPageIndexChange} type="button" key={index} value={index} className="btn btn-sm btn-page" />);
    }
    if (props.TotalAccounts > 0) {
        BtnList.push(<strong key={-1}>page {props.currentPage} of {Math.ceil(props.TotalAccounts / 3)} </strong>);
    }
    return (
        <div>
            {BtnList}
            <div className="btn-group">
                <input type="button" data-name="btn-Add-Account" onClick={props.onCreateNewAccount} className="btn btn-link" value="Add New Account" />
            </div>
        </div>
    );
};

export default AccountsPages;