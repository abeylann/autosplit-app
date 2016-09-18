import React, {
	Component,
} from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableHighlight,
	AppRegistry,
	ScrollView,
	DatePickerIOS,
	TextInput,
	Picker
} from 'react-native';

import moment from 'moment';

import MaterialButton from './MaterialButton.js';

export default class Subscriptions extends Component {
	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'purple', height: 80, justifyContent: 'center', alignItems: 'center'}}>
				<Text>{this.props.subscription}</Text>
			</View>
		);
	}
}