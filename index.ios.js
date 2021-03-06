/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

const firebase = require('firebase');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import LandingPage from './components/Landing.js';

class AutosplitApp extends Component {
  render() {
    return (
      <Navigator
      initialRoute={{name: 'LandingPage', component: LandingPage}}
      renderScene={(route, navigator) => {
        if(route.component) {
          return React.createElement(route.component, {navigator, firebase});
        }
      }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AutosplitApp', () => AutosplitApp);
