
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getReports } from '../firebase/db';


class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      users: null,
      reportList: [],
      longitude: [],
      latitude: []
    };
  }

  componentDidMount() {

    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );

    getReports(function (reportList) {
        //console.log(reportList);

        var latitude = [];
        var longitude = [];

        // make latitude and longitude arrays
        for(var i = 0; i < reportList.length; i++)
        {
          latitude.push(reportList[i].latitude);
          longitude.push(reportList[i].longitude);
        }

        // // generate pins
        // for(var j = 0; j < latitude.length; j++)
        // {
        //   var location = {lat: latitude[j], lng: longitude[j]};
        //   //var marker = new this.props.google.maps.Marker({position: location, map: map});
        // }

        //console.log("latitude: " + latitude + "\tlongitude: " + longitude);

        // this.setState({longitude: longitude})
        // this.setState({latitude: latitude})
    });
    console.log(this.latitude);
  }


  render() {
	  //const { users } = this.state;
    //var reports = this.state.reportList;
    //console.log(reports);
    return (
    <div className="content">
        <h1>HOME</h1>
        <Table striped bordered condensed hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Incident Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark Jacob</td>
            <td>Vehicle</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Edward Cullen</td>
            <td>Pedestrian</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Eugene Peterson</td>
            <td>Other</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rick Grimes</td>
            <td>Pedestrial</td>
          </tr>
          <tr>
            <td>5</td>
            <td>April May</td>
            <td>Vehicle</td>
          </tr>
        </tbody>
      </Table>
      <div>

        <Map  style={{height: '70%'}}
              google={this.props.google}
              initialCenter={{
                lat: 28.602571,
                lng: -81.200439
              }}
              zoom={14}
              onClick={this.onMapClicked}
              >



        </Map>
      </div>
    </div>
    );
  }
}





//const authCondition = (authUser) => !!authUser;

/* export default withAuthorization(authCondition)(HomePage); */

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCcLd7cD6VCRp9h-dmSlXxpFZlcIRN4BAw")
})(HomePage)
