import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {connect} from 'react-redux';

class Map extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currLatitude: 0.0,
            currLongitude: 0.0,
            focusLatitude: 0.0,
            focusLongitude: 0.0,
            reportCoords: [[]],
            error: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => { 
                this.setState({
                    currLatitude: position.coords.latitude,
                    currLongitude: position.coords.longitude,
                    focusLatitude: position.coords.latitude,
                    focusLongitude: position.coords.longitude,
                    reportCoords: this.props.reportLocs,
                    error: null
                })
                if (this.props.latitude && this.props.longitude)
                {
                    this.setState({
                        focusLatitude: this.props.latitude,
                        focusLongitude: this.props.longitude
                    })
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
                    {this.state.reportCoords.map(coordinate => (
                        <Marker 
                            coordinate={{
                                latitude: coordinate[0],
                                longitude: coordinate[1]
                            }}
                            description={coordinate[0] + " " + coordinate[1]}
                        />
                    ))}
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.currLatitude,
                            longitude: this.state.currLongitude
                        }}
                        pinColor={'rgb(46, 52, 242)'}
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
    latitude: undefined,
    longitude: undefined,
    reportLocs: [[]]
};

export default connect(null, {})(Map);