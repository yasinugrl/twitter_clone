import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { colors } from '../style';

export default class Home extends Component {

  state = {
    active: false
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Anasayfa </Text>


        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: colors.main }}
            position="bottomRight"
            onPress={() =>  Actions.addtweet()}>
            <Icon name="pencil" />
          </Fab>
      </View>
    );
  }
}
