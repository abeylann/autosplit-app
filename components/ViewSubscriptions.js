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
    getInitialState: function(){
        return {
            relevantSubscriptions: {
                chronicsList: []
            }
        }
    }


    componentWillMount() {
        const currentUserId = this.props.firebase.auth().currentUser.uid;
        let allUsers;
        let allSubscriptions;
        let relevantSubscriptions = [];

        this.props.firebase.database().ref('subscriptions').once('value')
        .then((res) => {
            console.log('amir', res.val());
            allSubscriptions = res.val();
            return this.props.firebase.database().ref('users').once('value');
        })
        .then((users) => {
            console.log('amir2', users.val());
            allUsers = users.val();
            Object.keys(allSubscriptions).forEach(subscription => {
        		if(allSubscriptions[subscription].payer === currentUserId || allSubscriptions[subscription].recipient === currentUserId) {
        			relevantSubscriptions.push(allSubscriptions[subscription]);
        		}
        	});
            console.log('amir3', relevantSubscriptions)
            relevantSubscriptions.forEach((sub) => {
                sub.payer = allUsers[sub.payer];
        		sub.recipient = allUsers[sub.recipient];
            });
            this.setState({ relevantSubscriptions });
        })
        .catch((ex) => {
            console.log(ex);
        });
    }

	render() {

		let subscriptions = !this.state || !this.state.relevantSubscriptions ? [] : this.state.relevantSubscriptions.map((sub, index) => {
			return (<Subscription subscription={sub} key={index}/>);
		});

		return
			<ScrollView>
				<View>
					{subscriptions}
				</View>
			</ScrollView>
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
