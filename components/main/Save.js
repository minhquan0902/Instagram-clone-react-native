import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";

import firebase from "firebase";

require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props, { navigation }) {
  const [caption, setCaption] = useState("");

  // upload image to firebase storage
  const uploadImage = async () => {
    // uri of the image variable
    const uri = props.route.params.image;

    // send posts to firebase storage with this path provided
    const childpath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    console.log(childpath);

    // fetch the uri
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childpath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // store the post to firestore
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  // save the Data to Firebase Firestore
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption ..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
