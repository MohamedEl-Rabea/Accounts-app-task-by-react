import { Account } from '../store/accounts/types';

let apiURL = 'http://localhost:10300/api/values/';

export const loadAllCustomers: () => Promise<Response> = () => {
    return fetch(apiURL);
};

export const GetAccountsInfo: (customerId: string) => Promise<Response> = (customerId) => {
    return fetch(apiURL + 'GetAllCustomerAccounts/' + customerId);
};

export const loadAllCurrencies: () => Promise<Response> = () => {
    return fetch(apiURL + 'GetAllCurrencies');
};

export const loadAllClassCodes: (accType: string) => Promise<Response> = (accType) => {
    return fetch(apiURL + 'GetClassCodes/' + accType);
};

export const createAccount: (account: Account) => Promise<Response> = (account) => {
    return fetch(apiURL + 'AddAccount', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(account),
    });
};

export const toggleAccountState: (accountId: string) => Promise<Response> = (accountId) => {
    return fetch(apiURL + 'ToggleAccountStatus', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(accountId),
    });
};