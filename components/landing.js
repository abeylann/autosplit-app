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
// import SignInView from './signin.js';


// import loginStyling from '../styles/signUpSignInFormStyling.js';
// onPress={this.createUser.bind(this)}

const config = {
  apiKey: "AIzaSyBJgYAr2jxFzXeAp6EhhX_oxFO6B2zveXo",
  authDomain: "divvie-e4d2c.firebaseapp.com",
  databaseURL: "https://divvie-e4d2c.firebaseio.com",
  storageBucket: "divvie-e4d2c.appspot.com",
};

export default class LandingPage extends Component {
	constructor(props) {
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
		backgroundColor: '#63A56F'
	},
	container: {
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#63A56F'
	},
	button: {
		margin: 10
	}
});