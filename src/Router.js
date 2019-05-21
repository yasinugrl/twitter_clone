import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';

import { Router, Scene, Tabs, Stack, Drawer, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

// Onboarding Page
import Login from './components/Onboarding/Login';
import FirstScreen from './components/Onboarding/FirstScreen';
import Register from './components/Onboarding/Register';


// In Page
import Home from './components/Home';
import Explore from './components/Explore';
import Likes from './components/Likes';
import Profile from './components/Profile';
import { colors } from './style';

const { width } = Dimensions.get('window');


const iconn = (name, data) => {
  console.log(data.focused);
  return <Icon color={data.focused ? colors.main : 'black'} name={name} size={25} />
}

const rightButton = () => {
  return (
      <TouchableHighlight
        onPress={() => {
          
        }} 
        underlayColor='transparent'
        style={{ marginRight: 10 }}
      >
      <Icon color={colors.main} name={'cog'} size={20} />
     </TouchableHighlight>
  );
};

const leftButton = () => {
  return (
      <TouchableHighlight
        onPress={() => {
          Actions.drawerOpen()
        }} 
        underlayColor='transparent'
        style={{ marginLeft: 10 }}
      >
      <Icon name={'user-circle'} size={30} />
     </TouchableHighlight>
  );
};



export default class componentName extends Component {

  render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.titleStyle}
        sceneStyle={{ backgroundColor: 'white' }}
      >
        <Stack 
          key='Main' 
          hideNavBar
          transitionConfig={(data) => 
           { 
            screenInterpolator: StackViewStyleInterpolator.forHorizontal }
           
           }>
          <Scene key="firstScreen"
            hideNavBar
            component={FirstScreen}
            initial
          />

          <Scene key="login"
            hideNavBar
            component={Login}
          />
          <Scene key="register"
            hideNavBar
            component={Register}
            
          />

          <Drawer
            key="main"
            hideNavBar
            contentComponent={() => null}
            drawerPosition="left"
            drawerWidth={width/1.3}
            renderRightButton={rightButton}
            renderLeftButton={leftButton}
          >
            <Tabs key="tabpage" tabBarStyle={styles.tabBar} showLabel={false}>

              <Scene key="home"
                title="Anasayfa"
                icon={(data) => iconn('home', data)}
                component={Home}
                initial
              />
              <Scene key="explore"
                title="Keşfet"
                icon={(data) => iconn('search', data)}
                component={Explore}
              />

              <Scene key="likes"
                icon={(data) => iconn('bell', data)}

                title={'Beğeniler'}
                component={Likes} />


              <Scene key="profile"
                icon={(data) => iconn('envelope', data)}
                title={'Profil'}
                component={Profile} />
            </Tabs>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 0.3,
    backgroundColor: 'ghostwhite',
  },
  navigationBarStyle: {
    backgroundColor: 'red',
  },
  navigationBarTitleStyle: {
    color: 'white',
  },
};
