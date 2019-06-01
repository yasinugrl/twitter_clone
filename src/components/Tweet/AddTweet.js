import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


import { Button, Input } from '../Common';
import { colors } from '../../style'
import { Actions } from 'react-native-router-flux'

import { addTweet } from '../../actions';


class AddTweet extends Component {

    state = {
        tweet: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                    <Text onPress={() => Actions.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                    <Button
                        title={'Tweetle'}
                        onPress={() => this.props.addTweet({ tweet: this.state.tweet, 
                            profile_url: this.props.user.profile_url, 
                            title: this.props.user.title,
                            username:  this.props.user.username
                        })
                        }
                        style={{ width: '20%', height: 30 }}
                    />
                </View>

                <View style={{ flex: 12, padding: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon name={'user-circle'} size={40} onPress={() => this.selectPhoto()} />

                        <TextInput
                            placeholder='Neler oluyor?'
                            style={{ flex: 1, height: 100, padding: 10 }}
                            value={this.state.tweet}
                            onChangeText={(tweet) => this.setState({ tweet })}
                            autoFocus
                            multiline
                        />
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ tweetsResponse, authResponse }) => {
    return { loading: tweetsResponse.loading, user: authResponse.user }
}

export default  connect(mapStateToProps, { addTweet })(AddTweet)
