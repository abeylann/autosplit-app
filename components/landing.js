import React, {
	Component,
} from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image
} from 'react-native';

import MaterialButton from './MaterialButton.js';

import SignUpView from './SignUpView.js';

const config = {
  apiKey: "AIzaSyCfYIJdj5HmK00UPQxdRMGd9TzmMezJaZc",
  authDomain: "autosplit-80be3.firebaseapp.com",
  databaseURL: "https://autosplit-80be3.firebaseio.com",
  storageBucket: "autosplit-80be3.appspot.com",
  messagingSenderId: "555416472720"
};

export default class LandingPage extends Component {
	constructor(props) {
		props.firebase.initializeApp(config);
		super(props);
	}
	render () {
		return (
			<View style={styles.outerContainer}>
	      <View style={styles.container}>
	        <MaterialButton buttonText="Sign In"  />
	        <View style={{width: 20}} />
	        <MaterialButton buttonText="Sign Up" onPressFn={() => this.props.navigator.push({name: 'SignUpView', component: SignUpView})} />
				</View>
			</View>
    );
	}
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#72d4f8'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#72d4f8'
	},
	button: {
		margin: 10
	}
});