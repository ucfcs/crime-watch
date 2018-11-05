
import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getReports } from '../firebase/db';

let order = 'desc';

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
    var lat = [];
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
      object.setState({ 'latitude': lat,
                        'longitude': long,
                        'description': description,
                        'date': date,
                        'time': time,
                        'reportList': reportList
                      });
    })
  }

  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }

  render() {
    return (
    <div className="content">
      <h1 class="text-center">
      <Label bsStyle="danger">REPORT LIST</Label>
      </h1>
      <BootstrapTable ref='table' data={ this.state.reportList }>
      <TableHeaderColumn dataField='date' width='150' isKey={ true } dataSort={ true }>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='time' width='150' dataSort={ true }>Time</TableHeaderColumn>
      <TableHeaderColumn dataField='description' width='150' dataSort={ true }>Description</TableHeaderColumn>
      <TableHeaderColumn dataField='latitude' width='150' dataSort={ true }>Latitude</TableHeaderColumn>
      <TableHeaderColumn dataField='longitude' width='150' dataSort={ true }>Longitude</TableHeaderColumn>
      </BootstrapTable>
      <div>
        <Map  style={{height: '70%'}}
              google={this.props.google}
              center={{
                lat: 28.602571,
                lng: -81.200439
              }}
              zoom={13}
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
