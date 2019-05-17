import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from '../Common';


import { colors } from '../../style';

export default class Login extends Component {
  state = {
    showRightIcon: false,
    email: '',
    password: '',
    animation: new Animated.Value(0)
  }
 
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardWillShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardWillHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillShow(e) {
    console.log(e.endCoordinates.height);
    this.moveBottomView(-e.endCoordinates.height);
    
    console.log('_keyboardDidShow');
  }

  _keyboardWillHide(e) {
    console.log('_keyboardDidHide');
    this.state.animation.setValue(0);
  }

  moveBottomView(height){
    console.log('asdasd');
    Animated.timing(this.state.animation, {
        toValue: height,
        duration: 300
      }).start();
  }

  render() {
    const animatedStyles = {
      transform: [{ 
        translateY: this.state.animation,
      }],
    };
    return (
      <SafeAreaView
        forceInset={{ bottom: 'never' }}
        style={{ flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
          <Text onPress={() => Actions.pop()} style={{ color: colors.main, fontSize: 14 }}>İptal</Text>
          <Icon color={colors.main} name={'twitter'} size={40} />
          <Icon color={colors.main} name={'ellipsis-h'} size={25} />
        </View>

        <View style={{ flex: 9, backgroundColor: '' }}>
          <ScrollView style={{ backgroundColor: '', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, width: '70%', marginBottom: 20, textAlign: 'left', }}>Twitter'a giriş yap</Text>

            <Input
              placeholder={'e-posta'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.email}
              onChangeText={(email) => { this.setState({ email }) }}
              onPressIcon={() => console.log('icona tik')}
            />

            <Input
              placeholder={'Şifre'}
              secureTextEntry
              rightIcon={'close'}
              showRightIcon={false}
              value={this.state.password}
              onChangeText={(password) => { this.setState({ password }) }}
              onPressIcon={() => console.log('icona tik')}
            />

          </ScrollView>
        </View>

        <Animated.View style={[{ flex: 0.6, backgroundColor: '#edeeef', borderTopColor: '#b7b7b7', borderTopWidth: 0.3, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }, animatedStyles]}>


          <Text style={{ color: colors.main, fontSize: 14 }}>Şifreni mi unuttun?</Text>
          <Button
            title={'Giriş yap'}
            onPress={() => Actions.main({ type: 'reset' })
            }
            style={{ width: '25%', height: 30 }}
          />

        </Animated.View>

      </SafeAreaView>
    );
  }
}
