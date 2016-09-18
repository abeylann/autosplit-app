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
        let allUsers;
        let allSubscriptions;
        let relevantSubscriptions = [];

        this.props.firebase.database().ref('subscriptions').once('value')
        .then((res) => {
            allSubscriptions = res.val();
            return this.props.firebase.database().ref('users').once('value');
        })
        .then((users) => {
            allUsers = users.val();
            Object.keys(allSubscriptions).forEach(subscription => {
        		if(allSubscriptions[subscription].payer === currentUserId || allSubscriptions[subscription].recipient === currentUserId) {
        			relevantSubscriptions.push(allSubscriptions[subscription]);
        		}
        	});
            relevantSubscriptions.forEach((sub) => {
              sub.payerData = allUsers[sub.payer];
      				sub.recipientData = allUsers[sub.recipient];
      				sub.payerData.id = sub.payer;
      				sub.recipientData.id = sub.recipient;
      				sub.payer = sub.payerData;
      				sub.recipient = sub.recipientData;
            });
            this.setState({ relevantSubscriptions });
        })
        .catch((err) => {
            console.error(err);
        });
    }

	render() {

		let subscriptions = !this.state || !this.state.relevantSubscriptions ? [] : this.state.relevantSubscriptions.map((sub, index) => {
			return (<Subscription description={sub.description} frequencyNumber={sub.frequencyNumber} frequencyUnit={sub.frequencyUnit} firebase={this.props.firebase} amount={sub.amount} payer={sub.payer} recipient={sub.payer} key={index} isDarker={index%2===0}/>);
		});

		return (
			<ScrollView>
				<View style={{height: 80, backgroundColor: 'blue', justifyContent: 'center', alignItems:'center'}}>
					<Text style={{fontSize: 20, fontColor: 'grey'}}>Your Active Subscriptions</Text>
				</View>
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
