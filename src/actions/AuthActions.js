import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import { LOGIN_START, 
    LOGIN_SUCCESS, 
    LOGIN_FAILD,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD

} from './types';


export const login = (email, password) => {
    return (dispatch) => {
        if(validateEmail(email)) {
            if(email !== '' && password !== '') {
                dispatch({ type: LOGIN_START });
                firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
                    console.log('Başarılı: ', user);
                    dispatch({ type: LOGIN_SUCCESS });
                    Actions.main({ type: 'reset' });
                }).catch(error => {
                    console.log('Hatalı:', error);
                    Alert.alert('Kullanıcları bilgileri hatalı!')
                    dispatch({ type: LOGIN_FAILD });
                });
            } else {
                Alert.alert('Lütfen bütün alanları doldurun!')
            }
        } else {
            Alert.alert('Lütfen doğru bir email adresi giriniz')
        }
    }
}
export const register = (username, email, password) => {
    return (dispatch) => {
        if(password.length >= 6) { 
            if(validateEmail(email)) {
                if(email !== '' && password !== '' && username !== '') {
                    dispatch({ type: REGISTER_START });
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                        console.log('Register Başarılı: ', user.user._user.uid);
                       
                        dispatch({ type: REGISTER_SUCCESS });

                        const id = user.user._user.uid;

                        // db ye veri yaz
                        firebase.firestore().collection('users').doc(id).set({ username, email, password }).then(success => {
                            console.log('Kayıt başarılı: ', success);
                            
                        }).catch(error => {
                            console.log('Kayıt başarısız:', error);
                            
                        })
                        Actions.pop();
                    }).catch(error => {
                        console.log('Register Hatalı:', error);
                        // Alert.alert('');
                        dispatch({ type: REGISTER_FAILD });
                    });
                } else {
                    Alert.alert('Lütfen bütün alanları doldurun!')
                }
            } else {
                Alert.alert('Lütfen doğru bir email adresi giriniz')
            }
        } else {
            Alert.alert('Şifreniz 6 haneden fazla olmalı!')
        }
        
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}