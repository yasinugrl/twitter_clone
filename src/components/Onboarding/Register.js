import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from '../Common';
import { connect } from 'react-redux';
import { register } from '../../actions';


import { colors } from '../../style';

class Register extends Component {
  state = {
    showRightIcon: false,
    email: '',
    password: '',
    username: '',
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
          <Icon color={colors.main} name={'chevron-left'} size={20} onPress={() => Actions.pop()}/>
          <Icon color={colors.main} name={'twitter'} size={40} />
          <View />
        </View>

        { this.props.loading ?
        <View style={{ flex: 9, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
         : 
         <View style={{ flex: 9, backgroundColor: '' }}>
         <ScrollView style={{ backgroundColor: '', padding: 20 }}>
           <Text style={{ fontWeight: 'bold', fontSize: 20, width: '70%', marginBottom: 20, textAlign: 'left', }}>Hesabını Oluştur</Text>

           <Input
             placeholder={'kullanıcı adı'}
             rightIcon={'close'}
             showRightIcon
             value={this.state.username}
             onChangeText={(username) => { this.setState({ username }) }}
             onPressIcon={() => console.log('icona tik')}
           />

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
             rightIcon={'close'}
             secureTextEntry
             showRightIcon={false}
             value={this.state.password}
             onChangeText={(password) => { this.setState({ password }) }}
             onPressIcon={() => console.log('icona tik')}
           />

         </ScrollView>

       </View>
         }



        <Animated.View style={[{ flex: 0.6, backgroundColor: '#edeeef', borderTopColor: '#b7b7b7', borderTopWidth: 0.3, alignItems: 'center', padding: 10, alignItems: 'flex-end' }, animatedStyles]}>
          <Button
            title={'Kayıt ol'}
            onPress={() => this.props.register(
              this.state.username,
              this.state.email,
              this.state.password
            )
            }
            style={{ width: '25%', height: 30 }}
          />

        </Animated.View>

      </SafeAreaView>
    );
  }
}

const mapStataToProps = ({ authResponse }) => {
  console.log(authResponse);
  return { loading: authResponse.loading }
}

export default connect(mapStataToProps, { register })(Register)
