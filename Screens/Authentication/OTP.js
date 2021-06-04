import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { AuthContext } from "../../Routes/AuthProvider";

const Logo = () => {
  return (
    <Image
      style={{ width: 175, height: 175, resizeMode: "cover" }}
      source={require("../../Assets/img/favicon.png")}
    />
  );
};

const OTP = () => {
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { verifyPhone } = useContext(AuthContext);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      if (OTP.length !== 6) {
        setLoading(false);
      } else {
        await verifyPhone(OTP);
        setLoading(false);
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
        <Text style={styles.text}>Verify, Phone Number</Text>

        <OTPInputView
          pinCount={6}
          style={{ width: "100%", height: 50, marginVertical: 20 }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            setOTP(code);
          }}
        />

        <TouchableOpacity
          disabled={disabled}
          style={styles.button}
          onPress={() => verifyOTP()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By Verifying, you confirm that you accept our{" "}
          </Text>
          <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
            <Text style={[styles.color_textPrivate, { color: "#0AB5C2" }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: "#0AB5C2" }]}>
            Privacy Policy
          </Text>
        </View>
      </View>

      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "black",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "black",
  },
  underlineStyleHighLighted: {
    borderColor: "#0AB5C2",
  },
  underlineStyleBase: {
    borderWidth: 1,
    color: "black",
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
});
