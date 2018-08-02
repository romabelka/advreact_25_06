import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import BasicStore from './basic-store'

class PhotoStore extends BasicStore {
    @observable loading = false

    @action loadPhoto = async (uri, type, key) => {
      this.loading = true

      const store = this.getStore(type)
      const entities = store.entities
      const entity = entities[key];

      if(!entity) {
        return
      }

      const {uid, ...data} = entity

      const file = await fetch(uri).then(response => response.blob())

      const storageRef = firebase.storage().ref();

      const metadata = {
        contentType: 'image/jpeg'
      };

      const uploadTask = storageRef.child(`images/${type}/${file.data.name}`).put(file, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.error('User doesn\'t have permission to access the object')
              break;

            case 'storage/canceled':
              // User canceled the upload
              console.error('User canceled the upload')
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.error('User canceled the upload')
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(action((downloadURL) => {
            console.log('File available at', downloadURL);
            firebase.database().ref(`${type}/${uid}`).set({
              ...data,
              image: downloadURL
            });
            store.updateImage(uid, { ...entity, image: downloadURL})

            this.loading = false

            this.getStore('navigation').back()
          }));
        });
    }
}

export default PhotoStore