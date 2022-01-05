import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
      hasLocationPermission: false,
      latitude: 0,
      longitude: 0,
      restaurantList: []
  }

async getLocationAsync() {
  //The keyword await is used to wait for the activity which here is a promise of fetching data from remote server.
  //asks for permission to use location
  const { status } = await Permissions.askAsync(
    //grab data while app runs in foreground
    Permissions.LOCATION_FOREGROUND
  );
  if(status === 'granted') {
    //grab location data
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
        hasLocationPermission: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    });
  } else {
    alert('Location permission not granted');
  }
};

handleRestaurantSearch = () => {
  //baseURL
  const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  //add user's location to state lat & long
  const location = `location=${this.state.latitude},${this.state.longitude}`;
  //radius of search in meters
  const radius = '&radius=200';
  //type of search
  const type = '&keyword=restaurant';
  //our API key
  const key = '&key=AIzaSyBWWJUImGj4nj1W4N3g34yvwmbVZMJ_bBg';
  //add everything together so it can be passed as the API call
  const restaurauntSearchURL = url + location + radius + type + key;
  //fetch request for the API call
  fetch(restaurauntSearchURL)
    //handle when the promise is resolved and parse the JSON we were sent from Google
    .then(response => response.json())
    //change the restaurantList key within our state to match whatever we were sent back by this fetch request
    .then(result => this.setState({restaurantList: result}))
}


render() {
  //testing
  console.log(this.state.restaurantList);
  const renderRestaurantItem = ({item}) => {
    <Text>{item.name}</Text>
  }
    return (
        <View style={styles.container}>
          <FlatList
            data={this.state.restaurantList.results}
            keyExtractor={(item) => item.place_id}
            renderItem={renderRestaurantItem}
            style={styles.listName}
          />
          <TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
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
listName: {
  backgroundColor: '#F23CA1', 
  width: '80%', 
  margin: 60, 
  padding: 5
},
search: {
    backgroundColor: '#F23CA1',
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    color: 'white'
}
})
