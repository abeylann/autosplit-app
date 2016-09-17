import {
  MKButton,
  MKColor
} from 'react-native-material-kit';

import React, {
	Component,
} from 'react';

import {
	View,
	StyleSheet,
	Text
} from 'react-native';

export default class MaterialButton extends Component {
	render() {
		return (
			<MKButton
			  backgroundColor={this.props.color || '#1565C0'}
			  shadowRadius={5}
			  shadowOffset={{width:0, height:2}}
			  shadowOpacity={.7}
			  elevation={5}
			  shadowColor="black"
			  width={this.props.width || 150}
			  height={this.props.height || 100}
			  flexDirection="column"
			  justifyContent="center"
			  onPress={this.props.onPressFn}
			  >
			  <Text pointerEvents="none" style={{color: 'white', fontSize: this.props.buttonFontSize || 22, textAlign: 'center'}}>{this.props.buttonText}</Text>
			</MKButton>      
		);
	}
}