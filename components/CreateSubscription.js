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

export default class CreateSubscription extends Component {
	state = { //this.setState ??
		isPaying: true,
		frequencyUnit: 'days'
	};

	proposeSubscription() {

		let currentUser = this.props.firebase.auth().currentUser;
      let users = [];
      let transactions = {};

		this.props.firebase.database().ref(`users`).once('value')
    .then((res) => {
	    users = res.val();
	    this.state.otherUserId = Object.keys(users).find((userId) => { //not sure about returning this
		    return users[userId].email === this.state.otherEmail;
	    });
      this.state.statusActive = true; //TODO: true during testing, need to add approvals section for before and finish flag for after
      if (this.state.isPaying) {
        this.state.payer = currentUser.uid;
        this.state.recipient = this.state.otherUserId;
      }
      else {
        this.state.payer = this.state.otherUserId;
        this.state.recipient = currentUser.uid;
      }
      this.state.billStart = new Date(`${this.state.startDateMM}/${this.state.startDateDD}/${this.state.startDateYYYY}`);
      delete this.state.otherUserId;
			delete this.state.otherUser;
			delete this.state.isPaying;
			delete this.state.otherEmail;
			delete this.state.startDateMM;
			delete this.state.startDateDD;
			delete this.state.startDateYYYY;
      return this.props.firebase.database().ref('subscriptions').push(this.state);
    })
    .then((subscriptions) => {
      if(!this.state.statusActive) {
      	return;
      }
      if(!!this.state.statusActive) {
        let billStart = this.state.billStart;
        for (let i = 1; i <= this.state.numTimes; i++) {
          let billDate = moment(billStart).add(this.state.frequencyNumber*i, this.state.frequencyUnit).toDate();
          let newTransaction = {
              billAt: billDate,
              subscriptionId: subscriptions.key
          };
          let key = this.props.firebase.database().ref().push().key;
          transactions[key] = newTransaction;
        }
        return this.props.firebase.database().ref('transactions').update(transactions);
      }
    })
    .then((res) => {
      console.log('success!');
    	console.log(res);
    })
    .catch((ex) => {
        console.error(ex);
    });
  };

	render() {
    return (
    	<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: '#72d4f8', paddingTop: 60}} >
	        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
		        <MaterialButton
		        	width={100}
		        	height={50}
		        	buttonText="Charge"
		        	buttonFontSize={14}
		        	marginLeft={20}
		        	color={this.state && this.state.isPaying ?  'grey' : 'green'}
		        	onPressFn={() => this.setState({isPaying: false})}
		        />
		        <MaterialButton
		        	width={100}
		        	height={50}
		        	buttonText="Pay"
		        	buttonFontSize={14}
		        	marginRight={20}
		        	color={this.state && this.state.isPaying ? '#cc0000' : 'grey'}
		        	onPressFn={() => this.setState({isPaying: true})}
		        />
	        </View>

	        <Text>{this.state && this.state.isPaying ? 'Who do you want to pay?' : 'Who do you want to charge?'}</Text>
	        <BetterTextInput
	        	ref='otherEmail'
	        	onSubmitEditing={ () => this.refs.amount.focus() }
	        	onChangeText={(otherEmail) => this.setState({otherEmail})}
	        	placeholder='Enter their email address'
	        	keyboardType='email-address'
	        	autoCapitalize='none'
	        />
          <BetterTextInput
          	ref='amount'
          	onSubmitEditing={ () => this.refs.frequencyNumber.focus() }
          	onChangeText={(amount) => this.setState({amount})}
          	placeholder='How much?'
          	keyboardType='numeric'
          />
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          	<Text style={{flex: .5, marginTop: 10, marginLeft: 20, fontSize: 16}}>
          		Every
          	</Text>
          	<View style={{flex: .75}}>
		          <BetterTextInput
		          	lessMargin={true}
		          	ref='frequencyNumber'
		          	onChangeText={(frequencyNumber) => this.setState({frequencyNumber})}
		          	placeholder='#'
		          	keyboardType='numeric'
		          />
	          </View>
	          <View style={{flex: 2.5, marginTop: 10}}>
		        	<Picker
		         		selectedValue={this.state.frequencyUnit}
                        onSubmitEditing={ () => this.refs.startDateMM.focus() }
					  		onValueChange={(frequencyUnit) => this.setState({frequencyUnit})}>
					  		<Picker.Item label="Days" value="days" />
					  		<Picker.Item label="Weeks" value="weeks" />
					  		<Picker.Item label="Months" value="months" />
					  	</Picker>
		        </View>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          	<View style={{flex: 1}}>
		          <BetterTextInput
		          	ref='startDateMM'
		          	onSubmitEditing={ () => this.refs.startDateDD.focus() }
		          	onChangeText={(startDateMM) => this.setState({startDateMM})}
		          	placeholder='MM'
		          />
	          </View>
	          <View style={{flex: 1}}>
		          <BetterTextInput
		          	ref='startDateDD'
		          	onSubmitEditing={ () => this.refs.startDateYYYY.focus() }
		          	onChangeText={(startDateDD) => this.setState({startDateDD})}
		          	placeholder='DD'
		          />
	          </View>
	          <View style={{flex: 1}}>
		          <BetterTextInput
		          	ref='startDateYYYY'
		          	onSubmitEditing={ () => this.refs.numTimes.focus() }
		          	onChangeText={(startDateYYYY) => this.setState({startDateYYYY})}
		          	placeholder='YYYY'
		          />
	          </View>
          </View>
          <BetterTextInput
          	ref='numTimes'
          	onChangeText={(numTimes) => this.setState({numTimes})}
          	placeholder='How many times?'
          	keyboardType='numeric'
          />

          <BetterTextInput
          	ref='description'
          	onChangeText={(description) => this.setState({description})}
          	placeholder='Description'
          	returnKeyType='done'
          	multiline={true}
          />

	        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
	        	<MaterialButton width={175} height={50} buttonText="Propose Subscription" onPressFn={this.proposeSubscription.bind(this)} buttonFontSize={14}/>
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
