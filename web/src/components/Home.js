
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper, MapContainer } from 'google-maps-react';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
	  const { users } = this.state;

    return (
    <div>
        <h1>Home</h1>

        <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Incident Type</th>
            <th>Report Map</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark Jacob</td>
            <td>Vehicle</td>
            <td>MAP</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Edward Cullen</td>
            <td>Pedestrian</td>
            <td>MAP</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Eugene Peterson</td>
            <td>Other</td>
            <td>MAP</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rick Grimes</td>
            <td>Pedestrial</td>
            <td>MAP</td>
          </tr>
          <tr>
            <td>5</td>
            <td>April May</td>
            <td>Vehicle</td>
            <td>MAP</td>
          </tr>
        </tbody>
      </Table>

      <Map  style={{width: '60%'},{height: '75%'}} google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>

        </InfoWindow>
      </Map>

      </div>



    );
  }
}

/*
const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>
*/


const authCondition = (authUser) => !!authUser;

/* export default withAuthorization(authCondition)(HomePage); */

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCcLd7cD6VCRp9h-dmSlXxpFZlcIRN4BAw")
})(HomePage)
