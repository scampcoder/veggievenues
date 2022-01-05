import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hasLocationPermission: false,
        latitude: 0,
        longitude: 0,
        restaurantList: []
    }
}
render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity >
                <Text style={styles.search}>Find Veggies</Text>
            </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
},
search: {
    backgroundColor: '#F23CA1',
    textAlign: 'center',
    padding: 20, 
    marginTop: 50,
    fontSize: 20,
    color: 'white'
}
})
