import * as React from 'react';
import { connect } from 'react-redux';
import { AccountState, Account } from '../../store/accounts/types';
import { ApplicationState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import * as actions from '../../store/accounts/actions';
import * as currencyActions from '../../store/currencies/actions';
import * as classCodesActions from '../../store/class_codes/actions';
import AccountInfo from './AccountInfoUI';
import AccountsList from './AccountsListUI';
import AccountsPages from './AccountsPagesUI';
import { Route } from 'react-router-dom';
import AccountInputForm from './AccountInputFormUI';
import { CurrencyState } from '../../store/currencies/types';
import { ClassCodesState } from '../../store/class_codes/types';
import { AjaxCallState, ajaxStatus } from '../../store/ajaxRequest/types';

interface AccountsStateToProps {
    accounts: AccountState;
    currencies: CurrencyState;
    classCodes: ClassCodesState;
    ajaxState: AjaxCallState;
}

interface AccountsActionsToProps {
    actions: typeof actions;
    currencyActions: typeof currencyActions;
    classCodesActions: typeof classCodesActions;
}

interface RouterProps {
    match: any;
    history: any;
}

export interface AccountLocalState {
    pageNumber: number;
    account: Account;
    errMsgs: string[];
}

type AccountsProps = AccountsStateToProps & AccountsActionsToProps & RouterProps;

const initialAccountState: Account = {
    Acc_Number: '', Acc_Type: '-1', Class_Code: '-1', CurrencyId: '-1',
    CustomerId: '0', Openning_Balance: 0, Status: true
};

class Accounts extends React.Component<AccountsProps, AccountLocalState> {
    constructor(props: AccountsProps) {
        super(props);
        this.state = { pageNumber: 1, account: initialAccountState, errMsgs: [] };
    }

    componentDidMount() {
        this.props.actions.thunkLoadAllAccounts(this.props.match.params.customerId);
    }

    onPageIndexChange = (event: any) => {
        this.setState({ pageNumber: event.target.value });
    }

    onCreateNewAccount = () => {
        // Load all currencies from database
        this.setState({ account: initialAccountState, errMsgs: [] });
        this.props.currencyActions.thunkGetAllCurrencies();
        this.props.history.push(this.props.match.url + '/new');
    }

    onAccTypeChange = (event: any) => {
        let accType = event.target.value;
        this.setState({
            ...this.state, account: {
                ...this.state.account,
                CustomerId: this.props.match.params.customerId,
                Acc_Type: accType
            }
        });
        this.props.classCodesActions.thunkGetClassesCodesByAccTypeSuccess(accType);
    }

    onTextChnage = (event: any) => {
        let changedValue = event.target.value;
        let propName = event.target.name;
        this.setState({
            ...this.state, account: { ...this.state.account, [propName]: changedValue }
        });
    }

    toggleStatus = (accountId?: string) => {
        this.props.actions.thunkToggleAccountSuccess(accountId);
    }

    inputModel = () => {
        let { Acc_Number, Acc_Type, Class_Code, CurrencyId, Openning_Balance } = this.state.account;
        let isValid = true;
        let errList: string[] = [];
        if (Acc_Type === '-1') {
            isValid = false;
            errList = errList.concat('Account type is required');
        }
        if (Class_Code === '-1') {
            isValid = false;
            errList = errList.concat('Class code is required');
        }
        if (CurrencyId === '-1') {
            isValid = false;
            errList = errList.concat('Currency type is required');
        }
        if (Acc_Number === '') {
            isValid = false;
            errList = errList.concat('Account number is required');
        }
        if (Openning_Balance < 1 || Openning_Balance.toString() === '' || isNaN(Openning_Balance)) {
            isValid = false;
            errList = errList.concat('Openning balance should have value greater than zero!');
        }
        return { isValid, errList };
    }

    onAddBtnClick = () => {
        let { isValid, errList } = this.inputModel();
        if (isValid) {
            this.props.actions.thunkAddAccount(this.state.account);
            this.setState({ account: initialAccountState, errMsgs: [] });
        } else {
            this.setState({ errMsgs: errList });
        }
    }

    public render(): JSX.Element {
        let startIndex = (this.state.pageNumber - 1) * 3;
        let endIndex = this.state.pageNumber * 3;
        return (
            <div className="col-sm-8">
                {
                    this.props.ajaxState.status === ajaxStatus.started && this.props.ajaxState.component === 'accounts' ?
                        (
                            <div className="loader" />
                        )
                        :
                        (
                            <div>
                                <AccountInfo
                                    CustomerId={this.props.accounts.AccountInfo.CustomerId}
                                    CustomerName={this.props.accounts.AccountInfo.CustomerName}
                                    OpenDate={this.props.accounts.AccountInfo.OpenDate}
                                    CalculatedBalance={this.props.accounts.AccountInfo.CalculatedBalance}
                                />
                                <AccountsList ajaxStatus={this.props.ajaxState} toggleStatus={this.toggleStatus} pageNumber={1} ListOfAccounts={this.props.accounts.AccountsList.slice(startIndex, endIndex)} />
                                <AccountsPages currentPage={this.state.pageNumber} onCreateNewAccount={this.onCreateNewAccount} onPageIndexChange={this.onPageIndexChange} TotalAccounts={this.props.accounts.AccountsList.length} />
                            </div>
                        )
                }
                <Route
                    path={this.props.match.url + '/new'}
                    render={() =>
                        <AccountInputForm
                            currencies={this.props.currencies.CurrenciesList}
                            onAccTypeChange={this.onAccTypeChange}
                            classCodes={this.props.classCodes.ClassCodes}
                            onTextChange={this.onTextChnage}
                            onAddBtnClick={this.onAddBtnClick}
                            account={this.state.account}
                            errMsgs={this.state.errMsgs}
                        />
                    }
                />
            </div>
        );
    }
}

const mapStateToProps: (state: ApplicationState) => AccountsStateToProps =
    (state: ApplicationState) => {
        console.log(state);
        return ({
            accounts: state.accounts,
            currencies: state.currencies,
            classCodes: state.classCodes,
            ajaxState: state.ajaxCallState
        });
    };

const mapDispatchToProps: (dispatch: Dispatch<AccountState>) => AccountsActionsToProps =
    (dispatch: Dispatch<AccountState>) => {
        return ({
            actions: bindActionCreators(actions, dispatch),
            currencyActions: bindActionCreators(currencyActions, dispatch),
            classCodesActions: bindActionCreators(classCodesActions, dispatch)
        });
    };
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);