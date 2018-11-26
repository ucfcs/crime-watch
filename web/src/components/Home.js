
import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { getReports } from '../firebase/db';
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory';

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
<<<<<<< HEAD
=======
	  barData: [],
	  showingInfoWindow: false,
	  activeMarker: {},
	  selectedPlace: {},
	  mostType: [],
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
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

		var fiveTypes = ["Animal","Construction","Pedestrian","Traffic","Vehicle"];
<<<<<<< HEAD
=======
		var mostType = 0;
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc

	  for(var k = 0; k < fiveTypes.length; k++)
	  {
		  var count = 0;
		  var mostTypeName = [];
		  for(var l = 0; l < type.length; l++)
		  {
			  if(fiveTypes[k] === type[l])
			  {
				  count++;
			  }
		  }
<<<<<<< HEAD

=======
		  if(count > mostType)
		  {
			  mostType = count;
			  mostTypeName = fiveTypes[k];
			  //console.log(mostTypeName);
		  }
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
		  pie.push({x: fiveTypes[k], y: count / type.length * 100});
	  }
	  var hourArray = [];
	  for(var i = 0; i < time.length; i++)
	  {
		  var hourStr = time[i].substring(0,2);
		  var hourInt = parseInt(hourStr, 10);
		  hourArray.push(hourInt);
	  }
	  var hour1 = 0;
	  var hour2 = 0;
	  var hour3 = 0;
	  for(var i = 0; i < hourArray.length; i++)
	  {
		  if(hourArray[i] >= 0 && hourArray[i] < 8)
		  {
			  hour1++;
		  }
		  else if(hourArray[i] >= 8 && hourArray[i] < 16)
		  {
			  hour2++;
		  }
		  else
		  {
			  hour3++;
		  }
	  }
	  var barData = [];
	  barData.push(hour1);
	  barData.push(hour2);
	  barData.push(hour3);
      object.setState({ 'latitude': lat,
                        'longitude': long,
                        'description': description,
                        'date': date,
                        'time': time,
<<<<<<< HEAD
						            'pieData': pie,
=======
						'pieData': pie,
						'barData': barData,
						'mostType': mostTypeName,
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
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

  onMarkerClick = (props, marker, e) =>
	this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	});

  render() {
<<<<<<< HEAD
    console.log(this.state.pieData)
=======
    console.log(this.state.mostType)
	var testString = "Test";
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
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
		<VictoryChart domainPadding={20}>
			<VictoryAxis
				tickValues={[1,2,3]}
				tickFormat={["0000 - 0800", "0800-1600", "1600-0000"]}
			/>
			<VictoryAxis
			dependentAxis
			tickFormat={(x) => (x)}
			/>
          <VictoryBar
		    data = {[{x: 1, y: this.state.barData[0]}, {x: 2, y: this.state.barData[1]}, {x: 3, y: this.state.barData[2]}]}
		  />
		  </VictoryChart>
        </div>
        <div style={{marginLeft:'300px', float:'left'} }>
          <VictoryPie
<<<<<<< HEAD
            colorScale={["tomato", "orange", "gold", "cyan", "navy", "green"]}
			      data = {this.state.pieData}
=======
            colorScale={['#68C690', '#6693C8', '#BA4C71', '#A07CBF', '#D09D3D']}
			data = {this.state.pieData}

>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
          />
        </div>
      </div>
      <br/>
      <br/>
<<<<<<< HEAD
=======

	  <h1 class="text-center" style={ {fontFamily:'Garamond'} }>
      <Label bsStyle="info">Number of Reports: {this.state.reportList.length}</Label>
	  <Label bsStyle="info">Average Reports Per Day: {this.state.reportList.length / 30}</Label>
	  <Label bsStyle="info">Average Reports Per Week: {this.state.reportList.length / 7}</Label>
      </h1>
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc

      <h1 class="text-center" style={ {fontFamily:'Garamond'} }>
      <Label bsStyle="success">Incident Map</Label>
      </h1>
      <br/>
      <div>
        <Map style={ {height: '100%'} }
              google={this.props.google}
              center={{
                lat: 28.602571,
                lng: -81.200439
              }}
<<<<<<< HEAD
              zoom={11}
              onClick={this.onMapClicked} >
=======
              zoom={14}>
>>>>>>> 165eb4f440bae4ef24f1e7d783be7a9844e965dc
              {
                this.state.reportList.map(report => {
                  return(
                    <Marker onClick = {this.onMarkerClick}
					name = {report.date + " -- " + "<"+ report.description + "> " + report.type}
                    position={{lat: report.latitude, lng: report.longitude}}/>

                  )
                })
              }

			<InfoWindow
				marker = {this.state.activeMarker}
				visible = {this.state.showingInfoWindow}>
					<div>
						{this.state.selectedPlace.name}
					</div>
			</InfoWindow>
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
