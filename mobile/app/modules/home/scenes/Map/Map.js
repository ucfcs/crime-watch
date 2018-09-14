import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';

class Map extends React.Component {
    constructor(){
        super();
        this.state = { }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                region={{
                    latitude: 28.6024,
                    longitude: -81.2000,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08
                }}
                >
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

export default connect(null, {})(Map);