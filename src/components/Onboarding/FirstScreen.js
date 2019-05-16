import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation'
import { Button } from '../Common';
import { colors } from '../../style';


export default class FirstScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '' }}>

                <View style={{ flex: 1, backgroundColor: '', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon color={colors.main} name={'twitter'} size={40} />
                </View>

                <View style={{ flex: 8, backgroundColor: '', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 25, width: '70%', marginBottom: 20, textAlign: 'left', padding: 10}}>Şu anda dünyada olup bitenleri gör.</Text>

                     <Button 
                        title={'Hesap Oluştur'} 
                        onPress={() => Actions.register()}
                     />
                    
                </View>

                <View style={{ flex: 1, width: '70%', backgroundColor: '' }}>
                    <Text style={{ fontSize: 12 }} onPress={() => Actions.login()}>Zaten bir hesabın var mı? <Text style={{ color: colors.main}}>Giriş yap</Text></Text>
                </View>
            </SafeAreaView>
        );
    }
}
