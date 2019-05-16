import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../style';

class Button extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}style={{ height: 40, width: '70%', borderRadius: 20, backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold'}}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }
}

export { Button };
