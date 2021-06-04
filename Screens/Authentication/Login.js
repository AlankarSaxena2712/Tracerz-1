import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image
} from "react-native";

import { AuthContext } from "../../Routes/AuthProvider";

const Logo = () => {
  return (
    <Image
      style={{ width: 175, height: 175, resizeMode: "cover" }}
      source={require("../../Assets/img/favicon.png")}
    />
  );
};

export default function Login({ navigation }) {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { phoneAuth } = useContext(AuthContext);

  const login = async () => {
    try {
      setLoading(true);
      if (number.length !== 10) {
        setError(true);
        setErrorMsg("Enter a Valid Number!");
        setLoading(false);
        return;
      } else {
        await phoneAuth(`+91${number}`);
        setError(false);
        setSuccess(true);
        setSuccessMsg("Success!")
        setLoading(false);
        setNumber("");
        navigation.navigate("OTP");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Logo />
      </View>
      <View style={styles.lower}>
        {error ? (
          <View style={styles.error}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        ) : (
          <></>
        )}
        {success ? (
          <View style={styles.success}>
            <Text style={styles.successMsg}>{successMsg}</Text>
          </View>
        ) : (
          <></>
        )}
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={(userNumber) => {
            setNumber(userNumber);
          }}
        />
        <TouchableOpacity
          disabled={disabled}
          style={styles.button}
          onPress={() => login()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  upper: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lower: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0095F6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "white",
    lineHeight: 15,
  },
  error: {
    backgroundColor: "#F8D7DA",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    width: "100%",
    marginVertical: 10,
  },
  errorMsg: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#93205C",
    lineHeight: 15,
  },
  success: {
    backgroundColor: "#D1E7DD",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    width: "100%",
    marginVertical: 10,
  },
  successMsg: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#0f5132",
    lineHeight: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#969696",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
