import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import ImageIndicator from 'react-native-image-progress';

import { colors } from '../../style';


export default class TweetItems extends Component {
  state = {
    uri: null,
    isMe: false
  };

  componentWillMount() {    
    if(this.props.profile_url != null) {
        this.setState({
          uri: this.props.profile_url
        });
    } else {
      var storage = firebase.storage().ref(`/profiles/${this.props.data.uid}`);
      storage.getDownloadURL().then(url => {
        console.log('Gelen url: ', url);
        this.setState({
          uri: url
        });
      }).catch(function (error) {
        console.log('eror: ', error);
  
      });
    }
  }

  iconSection(isText, name, number) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon name={name} size={10} />
        {isText ? <Text style={{ fontSize: 8, marginLeft: 5 }}>{number}</Text> : null}
      </View>
    )
  }

  render() {
    const { profile_url, fav, retweet, comment, tweet, user_name, title, uid } = this.props.data;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => console.log('item click')
        }
        style={{ padding: 20, borderBottomWidth: 0.5, borderColor: colors.line, flexDirection: 'row' }}>

        <View style={{ flex: 1.5 }}>
          {
            this.props.data.profile_url !== '' ?
              <TouchableOpacity
                onPress={() => Actions.profile({ uid })
                }>
                <ImageIndicator
                  source={{ uri: this.state.uri }}
                  imageStyle={{ width: 40, height: 40, borderRadius: 20, }}
                  style={{ width: 40, height: 40 }}
                  resizeMode={'cover'}
                />
              </TouchableOpacity>
              :
              <Icon name={'user-circle'} size={40} />
          }
        </View>

        <View style={{ flex: 9, marginLeft: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{title}<Text style={{ color: colors.line, fontWeight: '100', fontSize: 10 }}>  @{user_name} . 1 gün</Text></Text>

          <Text style={{ fontSize: 12, marginTop: 5 }}>{tweet}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 100, marginTop: 10 }}>
            {this.iconSection(true, 'comment', comment)}
            {this.iconSection(true, 'retweet', retweet)}
            {this.iconSection(true, 'heart', fav)}
            {this.iconSection(false, 'share-square')}
          </View>

        </View>

      </TouchableOpacity>
    );
  }
}