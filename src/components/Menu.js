import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../style';

class Menu extends Component {
    state = {
        avatarSource: '',
        userName: 'Yasin Ugurlu'
    }
    componentDidMount() {
        
    }
    sections(icon, name) {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '', alignItems: 'center', marginBottom: 20 }}>
                {icon != null ? <Icon name={icon} size={20} style={{ width: 30}} /> : null}
                <Text style={{ fontSize: 14, marginLeft: 20 }}>{name}</Text>
            </View>
        )
    }
    selectPhoto() {
      
    }
    render() {
        return (
            <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1 }}>
                <View style={{ flex: 2, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        {
                            this.state.avatarSource !== '' ?
                            <TouchableOpacity
                            onPress={() => this.selectPhoto()}
                            >
                                <Image
                                    source={{ uri: this.state.avatarSource}}
                                    style={{ width: 60, height: 60, borderRadius: 30, }}
                                /></TouchableOpacity> :
                                <Icon name={'user-circle'} size={40} onPress={() => this.selectPhoto()} />
                        }
                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{this.state.userName}</Text>
                        <Text style={{ fontSize: 12 }}>@ysnugrl</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>7 </Text>
                            <Text style={{ fontSize: 12 }}>Takip edilenler  </Text>
                            <Text style={{ fontSize: 12 }}>0 </Text>
                            <Text style={{ fontSize: 12 }}>Takipçiler</Text>
                        </View>

                    </View>
                    <Icon name={'ellipsis-h'} size={20} color={colors.main} />


                </View>

                <View style={{ flex: 7 }}>
                    <ScrollView style={{ backgroundColor: '' }}>
                        <View style={{ backgroundColor: '', padding: 20 }}>
                            {this.sections('user', 'Profil')}
                            {this.sections('list-alt', 'Listeler')}
                            {this.sections('bookmark', 'Yer İşaretleri')}
                            {this.sections('bolt', 'Anlar')}
                        </View>

                        <View style={{ backgroundColor: 'black', height: 0.5, width: '100%', marginBottom: 20 }} />

                        {this.sections(null, 'Ayarlar ve gizlilik')}
                        {this.sections(null, 'Yardım Merkezi')}

                    </ScrollView>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
                    <Icon name={'lightbulb-o'} size={30} color={colors.main} />
                    <Icon name={'arrows-alt'} size={20} color={colors.main} />
                </View>

            </SafeAreaView>
        );
    }
}


export default Menu
