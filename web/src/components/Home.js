
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
//import { getReports } from '../firebase/db';
import { getReports } from '../firebase/db';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      latitude: [],
      longitude: [],
      description: [],
      time: [],
      reportList: []
    };
  }

  componentDidMount = async () => {
/*
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
*/  var lat = [];
    var long = [];
    var description = [];
    var date = [];
    var time = [];
    var reportList = []

    db.getReports(this, function (reportList, object){
      for(var i = 0; i < reportList.length; i++)
          {
            lat.push(reportList[i].latitude);
            long.push(reportList[i].longitude);
            description.push(reportList[i].description);
            date.push(reportList[i].date);
            time.push(reportList[i].time);

          }
          //console.log(reportList);
          object.setState({ 'latitude': lat,
                            'longitude': long,
                            'description': description,
                            'date': date,
                            'time': time,
                            'reportList': reportList
                          });
    })
}

  render() {
    console.log(this.state.reportList);
    return (
    <div className="content">
        <h1>Report List</h1>

        <Table striped bordered condensed hover className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Incident description</th>
            <th>Latitude</th>
            <th>Longitude</th>

          </tr>
        </thead>
        <tbody>
          {
            this.state.reportList.map(report => {
              return(
                <tr key={report}>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>{report.description}</td>
                <td>{report.latitude}</td>
                <td>{report.longitude}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <div>
        <Map  style={{height: '70%'}}
              google={this.props.google}
              center={{
                lat: 28.602571,
                lng: -81.200439
              }}
              zoom={16}
              onClick={this.onMapClicked} >
              {
                this.state.reportList.map(report => {
                  return(
                    <Marker
                    position={{lat: report.latitude, lng: report.longitude}} />
                  )
                })
              }
        </Map>
      </div>
    </div>
    );
  }
}





//const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(HomePage);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCcLd7cD6VCRp9h-dmSlXxpFZlcIRN4BAw")
})(HomePage)
