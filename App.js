import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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

async getLocationAsync() {
  //The keyword await is used to wait for the activity which here is a promise of fetching data from remote server.
  //asks for permission to use location
  const { status } = await Permissions.askAsync(
    //grab data while app runs in foreground
    Permissions.LOCATION_FOREGROUND
  );
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
