import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { auth } from '../firebase';

const PasswordForgetPage = () =>
  <div>
    <h1 style={ {marginLeft:'150px', fontFamily:'Garamond'} }>Password Forget</h1>
    <br/><br/>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="text" value={this.state.email} placeholder="Email Address" style={{width:'50%'}} onChange={event => this.setState(byPropKey('email', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={isInvalid}>Reset Password</Button>
          </Col>
        </FormGroup>

        { error && <p style={ {marginLeft:'150px', color:'red'} }>{error.message}</p> }
      </Form>
    );
  }
}

const PasswordForgetLink = () =>
  <p style={ {marginLeft:'150px'} }>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
