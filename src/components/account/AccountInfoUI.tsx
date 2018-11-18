import * as React from 'react';
import { AccountInfo } from '../../store/accounts/types';

const AccountInfo: (props: AccountInfo) => JSX.Element = (props) => {
    return (
        <div>
            <strong>Customer name:<small>{' ' + props.CustomerName}</small></strong>
            <br />
            <strong>Calculated balance:<small>{' ' + props.CalculatedBalance.toString() + ' EGP'}</small></strong>
            <br />
            <strong>Open date:<small>{' ' + props.OpenDate.toString()}</small></strong>
        </div>
    );
};

export default AccountInfo;
