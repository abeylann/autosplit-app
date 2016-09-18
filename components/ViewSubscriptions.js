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
import Subscription from './Subscription.js';

export default class ViewSubscriptions extends Component {

	componentWillMount() {
		const currentUserId = this.props.firebase.auth().currentUser.uid;
		let allSubscriptions;
		let allUsers = [];
		this.props.firebase.database().ref('subscriptions').once('value') 
    .then(res => {
    	console.log('amir', res.val());
    	allSubscriptions = res.val();
    	return this.props.firebase.database().ref('users').once('value')
    })
    .then(res => {
    	allUsers = res.val();
    	const relevantSubscriptions = [];
    	Object.keys(allSubscriptions).forEach(subscription => { 
    		if(allSubscriptions[subscription].payer === currentUserId || allSubscriptions[subscription].recipient === currentUserId) {
    			relevantSubscriptions.push(allSubscriptions[subscription])
    		}
    	}); 
    	return Promise.all(relevantSubscriptions);
    })
    .then(relevantSubscriptions => {
relevantSubscriptions.forEach(sub => {
    		sub.payer = allUsers[sub.payer];
    		sub.recipient = allUsers[sub.recipient];
    		console.log('TEST', sub.approverId);
    		if(sub.approverId) {
    			sub.approverId = allUsers[sub.approverId]; // allUsers[sub.approverId] is undefined
    		}

    });
    	console.log('AMIR', relevantSubscriptions);
   

			this.setState({relevantSubscriptions});
    })
	}
	render() {
		const subscriptions = !this.state || !this.state.relevantSubscriptions ? [] : this.state.relevantSubscriptions.map((sub, index) => {
			return (<Subscription subscription={sub} key={index}/>);
		});

		return (
			<ScrollView>
				<View>
					{subscriptions}
				</View>
			</ScrollView>
		)
  }
}

const styles = {
	input: {
		backgroundColor: '#9FE2FC', 
		height: 40,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		paddingRight: 10,
		paddingLeft: 10
	},
	inputLessMargin: {
		backgroundColor: '#9FE2FC', 
		height: 40,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 0,
		paddingRight: 10,
		paddingLeft: 10
	}
};