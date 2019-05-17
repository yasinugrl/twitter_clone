import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../style';

class Button extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.props.style]}>
            <Text style={styles.title}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = {
  container: { height: 40, width: '70%', borderRadius: 20, backgroundColor: colors.main, alignItems: 'center', justifyContent: 'center' },
  title: { color: 'white', fontWeight: 'bold'}
}

export { Button };
