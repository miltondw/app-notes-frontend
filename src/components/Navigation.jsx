import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <NavLink to="/" exact  >Notes app </NavLink>
                </div>
                <nav className="nav">
                    <ul className="nav__ul">
                        <li className="nav__li">   
                            <NavLink to="/" exact activeClassName="link__active" >Home</NavLink>
                            <NavLink to="/create" activeClassName="link__active">Create Note</NavLink>
                            <NavLink to="/user" activeClassName="link__active" >Create User</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navigation;