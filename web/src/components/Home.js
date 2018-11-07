
import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getReports } from '../firebase/db';
import { VictoryBar, VictoryPie } from 'victory';

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
	    pieData: [],
      type: [],
      reportList: []
    };
  }

  componentDidMount = async () => {
    var lat = [];
    var long = [];
    var description = [];
    var date = [];
    var time = [];
	  var pie = [];
	  var type = [];
    var reportList = []

    db.getReports(this, function (reportList, object){
      for(var i = 0; i < reportList.length; i++)
      {
        lat.push(reportList[i].latitude);
        long.push(reportList[i].longitude);
        description.push(reportList[i].description);
        date.push(reportList[i].date);
        time.push(reportList[i].time);
		type.push(reportList[i].type);
      }

	  for(var k = 0; k < type.length; k++)
	  {
		  var count = 0;
		  for(var l = 0; l < type.length; l++)
		  {
			  if(type[k] === type[l])
			  {
				  count++;
			  }
		  }

		  pie.push({x: count, y: type.length, label: type[k]});
	  }
      object.setState({ 'latitude': lat,
                        'longitude': long,
                        'description': description,
                        'date': date,
                        'time': time,
						            'pieData': pie,
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
    console.log(this.state.pieData)
    return (
    <div className="content">
      <h1 class="text-center" style={ {fontFamily:'Garamond'} }>
      <Label bsStyle="danger">Report List</Label>
      </h1>
      <br/>

      <BootstrapTable ref='table' data={ this.state.reportList } pagination>
      <TableHeaderColumn dataField='date' width='150' isKey={ true } dataSort={ true }>Date</TableHeaderColumn>
      <TableHeaderColumn dataField='time' width='150' dataSort={ true }>Time</TableHeaderColumn>
      <TableHeaderColumn dataField='type' width='150' dataSort={ true }>Type</TableHeaderColumn>
      <TableHeaderColumn dataField='description' width='150' dataSort={ true }>Description</TableHeaderColumn>
      <TableHeaderColumn dataField='latitude' width='150' dataSort={ true }>Latitude</TableHeaderColumn>
      <TableHeaderColumn dataField='longitude' width='150' dataSort={ true }>Longitude</TableHeaderColumn>
      </BootstrapTable>

      <h1 class="text-center" style={ {fontFamily:'Garamond'} }>
      <Label bsStyle="primary">Data Visualization</Label>
      </h1>
      <br/>
      <div style={ {height:'400px', width:'1500px', display:'inline-block', backgroundColor:'#D6EAF8'} }>
        <div style={{marginLeft:'100px', float:'left'}}>
          <VictoryBar/>
        </div>
        <div style={{marginLeft:'300px', float:'left'} }>
          <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy", "green"]}
			      data = {this.state.pieData}
          />
        </div>
      </div>
      <br/>
      <br/>

      <h1 class="text-center" style={ {fontFamily:'Garamond'} }>
      <Label bsStyle="success">Incident Map</Label>
      </h1>
      <br/>
      <div>
        <Map  style={ {height: '100%'} }
              google={this.props.google}
              center={{
                lat: 28.602571,
                lng: -81.200439
              }}
              zoom={14}
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
      <br/>
    </div>
    );
  }
}

//const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(HomePage);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCcLd7cD6VCRp9h-dmSlXxpFZlcIRN4BAw")
})(HomePage)
