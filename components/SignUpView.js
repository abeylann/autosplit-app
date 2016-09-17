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

import MaterialButton from './MaterialButton.js';
import CreatePaymentView from './CreatePaymentView.js'

export default class SignUpView extends Component {
	createUser() {
		this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then((res) => {
			const currentUser = this.props.firebase.auth().currentUser;
      return this.props.firebase.database().ref('users/' + currentUser.uid).set({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        name: `${this.state.firstName} ${this.state.lastName}`
      });
		})
		.then((res) => {
			this.props.navigator.push({name: 'CreatePaymentView', component: CreatePaymentView});
		})
		.catch((err) => {
			console.error('ruh roh...', err);
		});
	}
	render() {
    return (
    	<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: '#72d4f8', paddingTop: 60}} >
	        <BetterTextInput 
	        	ref='email'
	        	onSubmitEditing={ () => this.refs.password.focus() }
	        	onChangeText={(email) => this.setState({email})} 
	        	placeholder='Email' 
	        	keyboardType="email-address"
	        	autoCapitalize='none'
	        />
          <BetterTextInput
          	ref='password'
          	onSubmitEditing={ () => this.refs.firstName.focus() }
          	onChangeText={(password) => this.setState({password})}
          	placeholder='Password'
          	secureTextEntry={true}
          />
	        <BetterTextInput
	        	ref='firstName'
	        	onSubmitEditing={ () => this.refs.lastName.focus() }
	        	onChangeText={(firstName) => this.setState({firstName})}
	        	placeholder='First Name'
	        />
	        <BetterTextInput
	        	ref='lastName'
	        	onChangeText={(lastName) => this.setState({lastName})}
	        	placeholder='Last Name'
	        	returnKeyType='done'
	        />
	        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
	        	<MaterialButton width={150} height={50} buttonText="Create Account" onPressFn={this.createUser.bind(this)} buttonFontSize={14}/>
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