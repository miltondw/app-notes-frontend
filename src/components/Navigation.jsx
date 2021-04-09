import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <NavLink to="/" exact >Notes app </NavLink>
                </div>
                <nav className="nav">
                    <ul className="nav__ul">
                        <li className="nav__li">   
                            <NavLink to="/" exact  activeClassName="link__active" >Home</NavLink>
                            <NavLink to="/user" activeClassName="link__active" >User</NavLink>
                            <NavLink to="/create" activeClassName="link__active">Create Note</NavLink>
                            <NavLink to="/edit/:id" activeClassName="link__active">Edit Note</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navigation;