import React, { Component } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { getTweet } from '../actions';

import { Actions } from 'react-native-router-flux';
import { colors } from '../style';

import TweetItems from './Tweet/TweetItems';

class Home extends Component {
  state = {
    active: false
  }
  componentDidMount() {
    this.props.getTweet();
  }

  render() {

    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    const unitId =
      Platform.OS === 'ios'
        ? 'ca-app-pub-5382522226522824/7739815766'
        : 'ca-app-pub-5382522226522824/1146487256';

    return (
      <View style={{ flex: 1 }}>
        <Banner
          unitId={unitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={(error) => {
            console.log('Add Error:', error);
          }}
        />

        <FlatList
          style={{ flex: 1 }}
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TweetItems
              data={item}
              index={index}
              profile_url={null}
            />
          }
        />

        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: colors.main }}
          position="bottomRight"
          onPress={() => {
            Actions.addtweet()
          }}>
          <Icon name="pencil" />

        </Fab>
      </View>
    );
  }
}

const mapStateToProps = ({ tweetsResponse }) => {
  console.log('Gelen tweetler: ', tweetsResponse.tweets);

  return { loading: tweetsResponse.loading, data: tweetsResponse.tweets }
}

export default connect(mapStateToProps, { getTweet })(Home)
