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
	state = {
		text: ''
	}
	componentWillMount() {
		const currentUserId = this.props.firebase.auth().currentUser.uid;
		const description = `every ${this.props.frequencyNumber} ${this.props.frequencyUnit} for "${this.props.description}".`
		if(this.props.payer.id === currentUserId) {
			this.setState({text: `You will pay ${this.props.recipient.name} $${Number(this.props.amount).toFixed(2)} ${description}`})
		} else {
			this.setState({text: `${this.props.recipient.name} will pay you $${Number(this.props.amount).toFixed(2)} ${description}`})
		}
		console.log(currentUserId)
	}

	render() {
		return (
			<View style={getStyling(this.props.isDarker)}>
				<Text>{this.state.text}</Text>
			</View>
		);
	}
}

function getStyling(isDarker) {
	console.log(isDarker)
	return {
		flex: 1,
		backgroundColor: isDarker ? '#72d4f8' : '#55ccf7',
		height: 80,
		justifyContent: 'center',
		alignItems: 'center'
	}
}