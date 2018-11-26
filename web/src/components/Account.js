import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1 style={ {marginLeft:'150px', fontFamily:'Garamond', display:'inline'} }>
          Account:
        </h1>
        <h1 style={ {marginLeft:'20px', fontFamily:'Garamond', color:'#2ECC71', display:'inline'} }>
          {authUser.email}
        </h1>
        <br/><br/>
        <h2 style={ {marginLeft:'150px', fontFamily:'Garamond'} }>
          Password Reset:
        </h2>
        <PasswordForgetForm />
        <br/>
        <h2 style={ {marginLeft:'150px', fontFamily:'Garamond'} }>
          Password Change:
        </h2>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
