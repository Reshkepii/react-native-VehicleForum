import FirebaseKeys from './config';
import firebase from 'firebase';
require('firebase/firestore');
var nr =1;
class Fire {
  constructor() {
    firebase.initializeApp(FirebaseKeys);
  }

  addPost = async (text) => {
    var postData ={text};
    var updates = {};
    updates['/posts/'+nr] = postData;
    nr = nr+1;
    return firebase.database().ref().update(updates);
    
  };

  createUser = async user => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection('users').doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert('Error: ', error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
