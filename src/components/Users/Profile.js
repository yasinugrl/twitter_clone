import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import TweetItems from '../Tweet/TweetItems';
import { colors } from '../../style';
import { Button } from '../Common';
import { connect } from 'react-redux';
import { getUserTweet, getOtherUserData, following } from '../../actions';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');


const PARALLAX_HEADER_HEIGHT = (height / 3);

class Profile extends Component {
    state = {
        user: null
    };

    componentWillMount() {

       


    }

    componentDidMount() {
        this.props.getOtherUserData(this.props.uid)
        this.props.getUserTweet(this.props.uid);
    }

    buttonMeth() {
        const { profile_url, username, title } = this.props.user;
        const { currentUser } = firebase.auth();
        let isMe = false;
        if(currentUser.uid === this.props.uid) {
            isMe = true;
        }

        return(
            <Button
            title={isMe ? 'Profili Düzenle' : 'Takip Et'}
            onPress={() => {
                if(!isMe) {
                    this.props.following({ uid: this.props.uid, username, title }, this.props.user_me.following);
                }
            }
            }
            style={{ width: '40%', height: 25, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.main, }}
            textStyle={{ color: colors.main }}
            />
        )
    }

    render() {
       
        const { profile_url, username, title } = this.props.user;
        return (
            <FlatList
                style={{ flex: 1 }}
                data={this.props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <TweetItems
                        data={item}
                        index={index}
                        profile_url={profile_url}
                    />
                }
                renderScrollComponent={data => (
                    <ParallaxScrollView
                        backgroundColor={colors.main}
                        contentBackgroundColor="white"
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        stickyHeaderHeight={90}
                        renderForeground={() => (
                            <View key="parallax-header" style={{ height: PARALLAX_HEADER_HEIGHT, backgroundColor: '', justifyContent: 'flex-end' }}>

                                <View style={{ justifyContent: 'space-between', backgroundColor: 'white', width, padding: 10 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <Icon name={'user-circle'} size={30} />
                                       {this.buttonMeth()}
                                    </View>
                                    <Text
                                        style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10 }}>{title}</Text>
                                    <Text style={{ fontSize: 12 }}>@{username}</Text>

                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Icon name={'calendar'} size={10} />
                                        <Text style={{ fontSize: 12, color: colors.placeholder, marginLeft: 10 }}>May 2019 tarihinde katıldı</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>7 </Text>
                                        <Text style={{ fontSize: 12, color: colors.placeholder }}>Takip edilenler  </Text>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>0 </Text>
                                        <Text style={{ fontSize: 12, color: colors.placeholder }}>Takipçiler</Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        renderStickyHeader={() => (
                            <View key="sticky-header" style={{ alignItems: 'center', justifyContent: 'center'}}>
                              <SafeAreaView>
                                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>{title}
                                </Text>
                              </SafeAreaView>
                              {/* Bu kısımda tabbar olacak */}
                            </View>   
                        )}

                        renderFixedHeader={() => (
                            <SafeAreaView key="fixed-header" style={{ 
                                position: 'absolute',
                                width,
                                justifyContent: 'space-between', 
                                backgroundColor: 'transparent'
                                }}>
                                 <Icon name={'arrow-circle-left'} size={25} style={{ marginLeft: 10 }} onPress={() => Actions.pop()} 
                                 />
                            </SafeAreaView>
                        )}
                        >

                    </ParallaxScrollView>
                )}
            />

        );
    }
}

const mapStateToProps = ({ tweetsResponse, authResponse }) => {
    return { 
        loading: tweetsResponse.loading, 
        data: tweetsResponse.user_tweets,
        user: authResponse.other_user,
        user_me: authResponse.user
    }
  }
  
  export default connect(mapStateToProps, { getUserTweet, getOtherUserData, following })(Profile)
