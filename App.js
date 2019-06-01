
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Router from './src/Router';
import reducers from './src/reducers';
import firebase from 'react-native-firebase';

export default class App extends Component {
  componentWillMount() {
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated',
      'Module RCTImageLoader requires main queue setup',
      'Module RNFetchBlob requires main queue setup',
      'Warning: Async Storage has been extracted',
      'Remote debugger'
  ]);
    firebase.crashlytics().enableCrashlyticsCollection();
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}
