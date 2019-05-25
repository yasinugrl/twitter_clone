import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../style';
import { Actions } from 'react-native-router-flux';

import { Button } from '../Common';

import { SafeAreaView } from 'react-navigation'


class AddTweet extends Component {

    state = {
        tweet: ''
    }
    render() {
        return (
            <SafeAreaView
                forceInset={{ bottom: 'never' }}
                style={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: '', flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text onPress={() => Actions.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>

                    <Button
                        title={'Tweetle'}
                        onPress={() => console.log()
                        }
                        style={{ width: '20%', height: 30 }}
                    />
                </View>


                <View style={{ flex: 13, backgroundColor: '', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>

                    <View style={{ flex: 1, backgroundColor: '' }}>
                    <Icon name="user-circle" size={30} />
                    </View>

                    <View style={{ flex: 9, backgroundColor: '' }}>
                        <TextInput
                        placeholder={'Neler oluyor'}
                        value={this.state.tweet}
                        onChangeText={(tweet) => this.setState({ tweet })}
                        multiline
                        style={{ height: 50, padding: 10}}
                        autoFocus
                        />

                    </View>




                </View>






            </SafeAreaView>
        );
    }
}

export default AddTweet
