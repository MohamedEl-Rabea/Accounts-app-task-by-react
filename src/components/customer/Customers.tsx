import * as React from 'react';
import { connect } from 'react-redux';
import { CustomerState } from '../../store/customers/types';
import { ApplicationState } from '../../store';
import { Dispatch, bindActionCreators } from 'redux';
import * as actions from '../../store/customers/actions';
import * as accountActions from '../../store/accounts/actions';
import CustomersList from './CustomersUI';
import { AjaxCallState } from '../../store/ajaxRequest/types';

interface CustomerStateToProps {
    customers: CustomerState;
    ajaxState: AjaxCallState;
}

interface CustomerActionsToProps {
    actions: typeof actions;
    accountActions: typeof accountActions;
}

type CustomerProps = CustomerStateToProps & CustomerActionsToProps;

interface CustomersLoaclState {
    searchStr: string;
}

class Customers extends React.Component<CustomerProps, CustomersLoaclState> {
    constructor(props: CustomerProps) {
        super(props);
        this.state = { searchStr: '' };
        this.props.actions.AsyncLoadAllCustomers();
    }

    onChange = (event: any) => {
        this.setState({ searchStr: event.target.value.toLowerCase() });
    }

    onClick = (event: any, customerId: string) => {
        this.props.accountActions.thunkLoadAllAccounts(customerId);
    }

    public render(): JSX.Element {
        return (
            <CustomersList
                filterdCustomers={this.props.customers.customers.
                    filter(c => c.CustomerName.toLowerCase().indexOf(this.state.searchStr) > -1 ||
                        c.CustomerId.toString().toLowerCase().indexOf(this.state.searchStr) > -1)}
                onChange={this.onChange}
                onClick={this.onClick}
                ajaxState={this.props.ajaxState}
            />
        );
    }
}

const mapStateToProps: (state: ApplicationState) => CustomerStateToProps =
    (state: ApplicationState) => {
        return ({
            customers: state.customers,
            ajaxState: state.ajaxCallState
        });
    };

const mapDispatchToProps: (dispatch: Dispatch<CustomerState>) => CustomerActionsToProps =
    (dispatch: Dispatch<CustomerState>) => {
        return ({
            actions: bindActionCreators(actions, dispatch),
            accountActions: bindActionCreators(accountActions, dispatch)
        });
    };
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
