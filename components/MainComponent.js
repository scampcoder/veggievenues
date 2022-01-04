import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLocationPermission: false,
            latitude: 0,
            longitude: 0,
            restaurantList: []
        }
    }
}