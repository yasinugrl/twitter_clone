
import firebase from 'react-native-firebase';

export const profileImageUpload = (uri) => {
    return(dispatch) => {
        uploadImage(uri)
        .then(url => { 
            console.log('REsim yükleme başarılı: ', url); 
            const { currentUser } = firebase.auth();
            firebase.firestore().collection('users').doc(currentUser.uid).update({ profile_url: url }).then(success => {
                console.log('update başarılı: ', success);
            }).catch(error => {
                console.log('update başarısız:', error);
            })
            
         })
        .catch(error => 
            console.log('resim yükleme hatalı:', error))
    }
}

const uploadImage = (uri, contenType = 'image/jpeg') => {
    return new Promise((resolve, reject) => {
    const { currentUser } = firebase.auth();
      firebase.storage().ref(`/profiles/${currentUser.uid}`).put(uri, { contenType }).then((data) =>{
          console.log('Resim yüklendikten sonra gelen data:', data);
        resolve(data.downloadURL);
      }).catch(error => {
          console.log('Hatatta: ', error);
          
        reject(error)
      })
    })
  }