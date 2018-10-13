import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {connect} from 'react-redux';
import { getOtherReportLocations } from "../../api"


class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            phone: 0,
            currLatitude: 0.0,
            currLongitude: 0.0,
            focusLatitude: 0.0,
            focusLongitude: 0.0,
            userReportCoords: [[]],
            otherReportCoords: [[]],
            error: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => { 
                this.setState({
                    phone: this.props.phone,
                    currLatitude: position.coords.latitude,
                    currLongitude: position.coords.longitude,
                    focusLatitude: position.coords.latitude,
                    focusLongitude: position.coords.longitude,
                    userReportCoords: this.props.reportLocs,
                    error: null
                });
                if (this.props.latitude && this.props.longitude)
                {
                    this.setState({
                        focusLatitude: this.props.latitude,
                        focusLongitude: this.props.longitude
                    });
                }
                console.log("YOU PRESSED VIEW ALL Reports");
                console.log(this.props.viewAllReports);
                console.log(getOtherReportLocations111(0));
                if (this.props.viewAllReports)
                {
                    var blah = getOtherReportLocations111(0);
                    console.log("HELLO");
                    console.log(blah);
                    this.setState({
                        otherReportCoords: getOtherReportLocations111()
                    })
                    // allReportCoords = undefined;
                    // getOtherReportLocations(this.state.phone, function (success, reportCoords) 
                    // {
                    //     if (success)
                    //     {
                    //         console.log("Retrieved all report coordinates");
                    //         allReportCoords = reportCoords;

                    //         // this.setState({
                    //         //     otherReportCoord: reportCoords
                    //         // })
                    //     }
                    //     else
                    //     {
                    //         console.log("Unable to retrieved all report coordinates");
                    //     }
                    // });
                    // console.log(allReportCoords);

                    // if (allReportCoords)
                    // {
                    //     console.log("Setting state:");
                    //     console(allReportCoords);
                    //     this.setState({
                    //             otherReportCoords: allReportCoords
                    //         })
                    // }
                }
             },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
                <MapView style={styles.map}
                region={{
                    latitude: this.state.focusLatitude,
                    longitude: this.state.focusLongitude,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08
                }}
                >
                    {this.state.userReportCoords.map(coordinate => (
                        <Marker 
                            coordinate={{
                                latitude: coordinate[0],
                                longitude: coordinate[1]
                            }}
                            description={coordinate[0] + " " + coordinate[1]}
                        />
                    ))}
                    {this.state.otherReportCoords.map(coordinate => (
                        <Marker 
                            coordinate={{
                                latitude: coordinate[0],
                                longitude: coordinate[1]
                            }}
                            description={coordinate[0] + " " + coordinate[1]}
                            pinColor={'rgb(10, 10, 10)'}
                        />
                    ))}
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.currLatitude,
                            longitude: this.state.currLongitude
                        }}
                        pinColor={'rgb(79, 225, 67)'}
                        title={"Current Position"}
                        description={this.state.currLatitude + " " + this.state.currLongitude}    
                    />
                </MapView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }

})

Map.defaultProps = {
    phone: undefined,
    latitude: undefined,
    longitude: undefined,
    reportLocs: [[]],
    viewAllReports: false
};

export default connect(null, {})(Map);