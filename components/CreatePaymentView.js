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
	TextInput
} from 'react-native';

import HomeNavigation from './HomeNavigation.js';

import MaterialButton from './MaterialButton.js';

export default class CreatePaymentView extends Component {
	addPaymentInfo() {
		const currentUserId = this.props.firebase.auth().currentUser.uid;
		this.props.firebase.database().ref(`users`).once('value')
    .then(res => {
        console.log('amir', res.val());
			const user = res.val()[currentUserId];
			this.state.uid = currentUserId;
			this.state.fullName = user.name;
			this.state.email = user.email;
			const options = {
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.state)
			}
			return fetch('http://localhost:1337/api/token', options)
    })
    .then(response => {
			if (!!response.ok) {
				this.props.navigator.push({name: 'HomeNavigation', component: HomeNavigation});
			} else {
				throw new Error(response.statusText);
			}
    })
		.catch(err => {
			console.error(err)
		});

	}
	render() {
    return (
    	<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: '#72d4f8', paddingTop: 60}} >
	        <BetterTextInput
	        	ref='routing'
	        	onSubmitEditing={ () => this.refs.account.focus() }
	        	onChangeText={(routing) => this.setState({routing})}
	        	placeholder='Bank Routing Number'
	        	keyboardType="numeric"
	        />
          <BetterTextInput
          	ref='account'
          	onSubmitEditing={ () => this.refs.ssn.focus() }
          	onChangeText={(account) => this.setState({account})}
          	placeholder='Bank Account Number'
          	keyboardType="numeric"
          />
          <BetterTextInput
          	ref='ssn'
          	onSubmitEditing={ () => this.refs.date.focus() }
          	onChangeText={(ssn) => this.setState({ssn})}
          	placeholder='Last 4 Digits of SSN'
          	keyboardType="numeric"
          />
	          <Text>Enter your date of birth</Text>
		        <DatePickerIOS
		        	date={this.state && this.state.date ? this.state.date : new Date()}
		        	ref="date"
		        	mode="date"
		        	onDateChange={(date) => this.setState({date})}
		        />
	        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
	        	<MaterialButton width={150} height={50} buttonText="Add Bank Account" onPressFn={this.addPaymentInfo.bind(this)} buttonFontSize={14}/>
	        </View>
      </ScrollView>
    );
  }
}

class BetterTextInput extends TextInput {
	render() {
		return(
			<TextInput
				style={styles.input}
				placeholder={this.props.placeholder}
				placeholderTextColor='#608492'
				ref={this.props.ref}
				returnKeyType={this.props.returnKeyType || 'next'}
				onChangeText={this.props.onChangeText}
				autoCorrect={this.props.autocorrect || false}
				secureTextEntry={this.props.secureTextEntry || false}
				onSubmitEditing={this.props.onSubmitEditing}
				autoCapitalize={this.props.autoCapitalize || 'words'}
				keyboardType={this.props.keyboardType || 'default'}
			/>
		);
	}
}

const styles = {
	input: {
		backgroundColor: '#9FE2FC',
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingRight: 10,
		paddingLeft: 10
	}
};
