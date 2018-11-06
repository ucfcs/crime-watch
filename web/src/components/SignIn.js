import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import { Nav, NavItem, Navbar, Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1 style={ {marginLeft:'150px',fontFamily:'Garamond'} }>Sign In</h1>
    <br/><br/>
    <SignInForm history={history} />
	   <PasswordForgetLink />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="text" value={email} placeholder="Email Address" style={{width:'50%'}} onChange={event => this.setState(byPropKey('email', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" value={password} placeholder="Password" style={{width:'50%'}} onChange={event => this.setState(byPropKey('password', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={isInvalid}>Sign in</Button>
          </Col>
        </FormGroup>
        { error && <p style={ {marginLeft:'150px', color:'red'} }>{error.message}</p> }
      </Form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
