import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation'
import { Button } from '../Common';
import { colors } from '../../style';
import { SAVE_USER_INFO } from '../../actions/types';

import { connect } from 'react-redux';
import { login } from '../../actions';

class FirstScreen extends Component {
    componentWillMount() {
        AsyncStorage.getItem(SAVE_USER_INFO)
            .then(req => JSON.parse(req))
            .then(json => {
                console.log('Login olan kullanıcı: ', json);
                if (json !== null) {
                    this.props.login(json.email, json.password)
                } else {

                }
            }).done();
    }

    render() {

        if(this.props.loading) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

            <ActivityIndicator size="large" color={colors.main} />
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>
               
                    <View style={{ flex: 1, backgroundColor: '', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon color={colors.main} name={'twitter'} size={40} />
                    </View>

                    <View style={{ flex: 8, backgroundColor: '', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 25, width: '70%', marginBottom: 20, textAlign: 'left', padding: 10 }}>Şu anda dünyada olup bitenleri gör.</Text>

                        <Button
                            title={'Hesap Oluştur'}
                            onPress={() => Actions.register()}
                        />
                    </View>

                    <View style={{ flex: 1, width: '70%', backgroundColor: '' }}>
                        <Text style={{ fontSize: 12 }} onPress={() => Actions.login()}>Zaten bir hesabın var mı? <Text style={{ color: colors.main }}>Giriş yap</Text></Text>
                    </View>
            </SafeAreaView>
        );
    }
}

const mapStataToProps = ({ authResponse }) => {
    console.log(authResponse);
    return { loading: authResponse.loading }
}

export default connect(mapStataToProps, { login })(FirstScreen)
