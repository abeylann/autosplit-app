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

import CreateSubscription from './CreateSubscription.js';
import ViewSubscriptions from './ViewSubscriptions.js';

export default class HomeNavigation extends Component {
	goToView(component, componentName) {
		this.props.navigator.push({name: componentName, component: component})
	}
	render() {
    return (
    	<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: '#72d4f8', paddingTop: 60}} >
    			<View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
		        <MaterialButton 
		        	width={300}
		        	height={150}
		        	marginBottom={200}
		        	buttonText="Future Transactions"
		        	buttonFontSize={14}
		        	color='green'
		        />
		        <MaterialButton 
		        	width={300}
		        	height={150}
		        	buttonText="Transaction History"
		        	margin={20}
		        	buttonFontSize={14}
		        	color='grey'
		        />
		        <MaterialButton 
		        	width={300}
		        	height={150}
		        	buttonText="Create Subscription"
		        	margin={20}
		        	buttonFontSize={14}
		        	color='grey'
		        	onPressFn={this.goToView.bind(this, CreateSubscription, 'CreateSubscription')}
		        />
		        <MaterialButton 
		        	width={300}
		        	height={150}
		        	buttonText="View Subscriptions"
		        	margin={20}
		        	buttonFontSize={14}
		        	color='grey'
		        	onPressFn={this.goToView.bind(this, ViewSubscriptions, 'ViewSubscriptions')}
		        />
	        </View>
      </ScrollView>
    );
  }
}




class BetterTextInput extends TextInput {
	render() {
		return(
			<TextInput 
				style={this.props.lessMargin ? styles.inputLessMargin : styles.input}
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
				multiline={this.props.multiline || false}
			/>
		);
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