import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

// 
export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={{uri: "https://res.cloudinary.com/teepublic/image/private/s--K_rZrNsA--/t_Preview/b_rgb:191919,c_lpad,f_jpg,h_630,q_90,w_1200/v1498165258/production/designs/1687129_1.jpg"}}/>
                    <Text style={styles.title}>Crime Watch</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}