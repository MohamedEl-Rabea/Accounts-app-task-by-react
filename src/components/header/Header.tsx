import * as React from 'react';

const Header: () => JSX.Element = () => {
    return (
        <div className="col-12 header-margin">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a className="navbar-brand" data-name="listItem" data-toggle="tab" href="#home">
                        <div className="ng-logo">
                            <b>NG</b>
                        </div>
                        <b>Ethix-NG</b>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#services">Customers</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#accountLog">Other</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;