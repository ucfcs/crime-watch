import React, { Component } from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from 'react-bootstrap';
import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (

      <Form horizontal onSubmit={this.onSubmit}>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="New Password" value={passwordOne} style={{width:'50%'}} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
          Confirm
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Confirm New Password" value={passwordTwo} style={{width:'50%'}} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={isInvalid}>Change Password</Button>
          </Col>
        </FormGroup>
        { error && <p style={ {marginLeft:'150px', color:'red'} }>{error.message}</p> }
      </Form>
    );
  }
}

export default PasswordChangeForm;
