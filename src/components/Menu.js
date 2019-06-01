import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../style';
import { profileImageUpload } from '../actions';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';


class Menu extends Component {
    state = {
        avatarSource: '',
        userName: 'Yasin Ugurlu',
        title: ''
    }
    componentDidMount() {
        console.log('menüye gelen props değerlerim: ', this.props);
        const { profile_url, username, title } = this.props.user_data;
        this.setState({
            avatarSource: profile_url,
            userName: username,
            title
        });

    }
    sections(icon, name, onPress) {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '', alignItems: 'center', marginBottom: 20 }}>
                {icon != null ? <Icon name={icon} size={20} style={{ width: 30 }} /> : null}
                <Text onPress={onPress} style={{ fontSize: 14, marginLeft: 20 }}>{name}</Text>
            </View>
        )
    }
    selectPhoto() {
        const options = {
            title: 'Profil Fotoğrafı Seçiniz',
            quality: 0.1,
            takePhotoButtonTitle: 'Resim Çek',
            chooseFromLibraryButtonTitle: 'Galeriden Seç',
            cancelButtonTitle: 'Kapat',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const uri = response.uri;
                this.setState({
                    avatarSource: uri,
                });
                this.props.profileImageUpload(uri);
            }
        });
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
                                        source={{ uri: this.state.avatarSource }}
                                        style={{ width: 60, height: 60, borderRadius: 30, }}
                                    /></TouchableOpacity> :
                                <Icon name={'user-circle'} size={40} onPress={() => this.selectPhoto()} />
                        }
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{this.state.title}</Text>
                        <Text style={{ fontSize: 12 }}>@{this.state.userName}</Text>
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
                            {this.sections('user', 'Profil', () => {
                                const { currentUser } =  firebase.auth();
                                Actions.profile({ uid: currentUser.uid })
                            })}
                            {this.sections('list-alt', 'Listeler')}
                            {this.sections('bookmark', 'Yer İşaretleri')}
                            {this.sections('bolt', 'Anlar')}
                        </View>

                        <View style={{ backgroundColor: 'black', height: 0.5, width: '100%', marginBottom: 20 }} />

                        {this.sections(null, 'Ayarlar ve gizlilik')}
                        {this.sections(null, 'Yardım Merkezi', 
                        () => {
                            Linking.openURL('https://help.twitter.com/tr');
                        }
                        )}

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

const mapStateToProps = ({ authResponse }) => {
    return { user_data: authResponse.user }
}

export default connect(mapStateToProps, { profileImageUpload })(Menu)
