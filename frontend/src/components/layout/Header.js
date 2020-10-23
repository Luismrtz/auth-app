import React from 'react';
import AuthOptions from '../auth/AuthOptions';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className="headerContainer">
            <Link className="title" to="/">
                <h1>Auth app</h1>
            </Link>
            <AuthOptions/>
        </header>
    )
}

export default Header
