import React from 'react';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
//import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <div>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#brand" style={ {fontFamily:'Garamond'} }>CRIME WATCH</a>
        </Navbar.Brand>
        <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="/">
        Landing
      </NavItem>
      <NavItem eventKey={2} href="/home">
        Home
      </NavItem>
      <NavItem eventKey={3} href="/account">
        Account
      </NavItem>
      <NavItem eventKey={4} onClick={auth.doSignOut} href="/signin">
        Sign Out
      </NavItem>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  </div>

const NavigationNonAuth = () =>
  <div>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand">CRIME WATCH</a>
          </Navbar.Brand>
          <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/">
          Landing
        </NavItem>
        <NavItem eventKey={2} href="/signin">
          Sign In
        </NavItem>

      </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>

export default Navigation;
