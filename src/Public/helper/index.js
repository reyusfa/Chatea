import ImagePicker from 'react-native-image-picker';
import { firebaseStorage, firebaseTimestamp } from '../config/firebase';

const options = {
  title: 'Select Profile Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const objectToArray = object => {
  if (object) {
    return Object.entries(object)
      .map(([k, v]) => {
        return {
          ...v
        };
      })
      .reverse();
  }
};

const launchImagePicker = callback => {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      callback(response);
    }
  });
};

const uploadImage = async ({ path, data, fileName }, callback) => {
  // console.log(data.fileName);
  const rootRef = firebaseStorage.ref();
  if (data.uri) {
    await fetch(data.uri)
      .then(file => {
        return file.blob();
      })
      .then(async blob => {
        // console.log(blob);
        await rootRef
          .child(path)
          .child(fileName ? fileName : data.fileName)
          .put(blob)
          .then(snap => {
            rootRef
              .child(snap.metadata.fullPath)
              .getDownloadURL()
              .then(url => callback({ downloadURL: url }));
          })
          .catch(callback);
      })
      .catch(callback);
  }
};

export { objectToArray, launchImagePicker, uploadImage };
