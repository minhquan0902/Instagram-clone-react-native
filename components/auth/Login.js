import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
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
      <Button onPress={() => onLogin()} title="Log In" />
    </View>
  );
};

export default Login;
