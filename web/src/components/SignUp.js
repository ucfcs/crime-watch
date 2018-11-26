import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';

const SignUpPage = ({ history }) =>
  <div>
    <h1 style={ {marginLeft:'150px', fontFamily:'Garamond'} }>SignUp</h1>
    <br/><br/>
    <SignUpForm history={history}/>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

	  this.state = { ...INITIAL_STATE };

  }


  onSubmit = (event) => {
	const {
      username,
      email,
      passwordOne,
    } = this.state;

	const{
		history,
	} = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
	event.preventDefault();
  }


  render() {

	const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

	const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Form horizontal onSubmit={this.onSubmit}>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
          Full Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" value={username} placeholder="Full Name" style={{width:'50%'}} onChange={event => this.setState(byPropKey('username', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Email
          </Col>
          <Col sm={10}>
            <FormControl type="text" value={email} placeholder="Email Address" style={{width:'50%'}} onChange={event => this.setState(byPropKey('email', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Enter Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" value={passwordOne} placeholder="Password" style={{width:'50%'}} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Confirm Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" value={passwordTwo} placeholder="Confirm Password" style={{width:'50%'}} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={isInvalid}>Sign Up</Button>
          </Col>
        </FormGroup>

        { error && <p style={ {marginLeft:'150px', color:'red'} }>{error.message}</p> }
      </Form>
    );
  }
}

const SignUpLink = () =>
  <p style={ {marginLeft:'150px'} }>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
