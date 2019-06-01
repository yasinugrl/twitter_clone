import { Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    ADD_TWEET_START,
    ADD_TWEET_SUCCESS,
    ADD_TWEET_FAILD,

    GET_TWEET_START,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAILD,


    GET_USER_TWEET_START,
    GET_USER_TWEET_SUCCESS,
    GET_USER_TWEET_FAILD
} from './types';


export const getUserTweet = (uid) => {
    return (dispatch) => {
        dispatch({ type: GET_USER_TWEET_START });
        
        const { currentUser } = firebase.auth();
        firebase.firestore().collection('tweets').where('uid', '==', uid).get().then((tweets) => {
            console.log('gelen data:', data);
            let data = [];
            tweets.forEach((doc) => {
                data.push(doc.data())
            });
            console.log('Twitler neler: ', data);
            dispatch({ type: GET_USER_TWEET_SUCCESS, payload: data });

        }).catch(error => {
            console.log('tweetleri çekerken hata aldık:', error);
            dispatch({ type: GET_USER_TWEET_FAILD });
        })
    }
}

export const getTweet = () => {
    return (dispatch) => {
        dispatch({ type: GET_TWEET_START });
        firebase.firestore().collection('tweets').get().then((tweets) => {
            console.log('gelen data:', data);
            let data = [];
            tweets.forEach((doc) => {
                data.push(doc.data())
            });
            console.log('Twitler neler: ', data);
            dispatch({ type: GET_TWEET_SUCCESS, payload: data });

        }).catch(error => {
            console.log('tweetleri çekerken hata aldık:', error);
            dispatch({ type: GET_TWEET_FAILD });
        })
    }
}

export const addTweet = (params) => {
    return (dispatch) => {
        Actions.pop();
        dispatch({ type: ADD_TWEET_START });
        const { tweet, profile_url, title } = params;
        const { currentUser } = firebase.auth(); 
        const prm = { tweet, title, uid: currentUser.uid, fav: 0, retweet: 0, comment: 0, createdDate: Date.now() };
        firebase.firestore().collection('tweets').add(prm).then(success => {
            console.log('Kayıt başarılı: ', success);
            dispatch({ type: ADD_TWEET_SUCCESS, payload: prm });
        }).catch(error => {
            console.log('Kayıt başarısız:', error);
            dispatch({ type: ADD_TWEET_FAILD });
            Alert.alert('Tweet gönderirken bir sorun oluştu lütfen daha sonra tekrar deneyiniz.')
        })
    }
}

export const following = (params, following) => {
    console.log('Geeln following: ', following);
    
    return (dispatch) => {
        const { uid } = params;
        const { currentUser } = firebase.auth(); 
        firebase.firestore().collection('users').doc(currentUser.uid).collection('following').doc(uid).set(params).then(data => {
            console.log('followin eklendi');
            firebase.firestore().collection('users').doc(currentUser.uid).update({
                following: following + 1
            });
        }).catch(error => {
            console.log('followin hataaa');

        });
    }
}