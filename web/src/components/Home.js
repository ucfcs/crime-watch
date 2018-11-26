
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
