import React from 'react';
import { Image, Jumbotron } from 'react-bootstrap';

const LandingPage = () =>
  <div class="text-center">
    <Jumbotron style={ {backgroundColor:'#D5F5E3', fontFamily:'Garamond'} }>
      <Image src={require('../assets/images/logo.png')} />
      <h1>WELCOME TO CRIME WATCH</h1>
    </Jumbotron>
  </div>

export default LandingPage;
