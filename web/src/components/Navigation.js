import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
//import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <div>
  <Nav bsStyle="tabs" activeKey="1">
        <NavItem eventKey="1" href= "/">
          Landing
        </NavItem>
        <NavItem eventKey="2" href= "/home" title="Item">
          Home
        </NavItem>
        <NavItem eventKey="3" href= "/account">
          Account
        </NavItem>
        <NavItem eventKey="4" onClick={auth.doSignOut}>
          Sign Out
        </NavItem>
        <NavDropdown eventKey="5" title="Dropdown" id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
  </div>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
