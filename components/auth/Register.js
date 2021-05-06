import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onPress={() => onSignUp()} title="Sign Up" />
    </View>
  );
};

export default Register;
