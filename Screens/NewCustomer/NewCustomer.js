import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../../Routes/AuthProvider";
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get("window");

const NewCustomer = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { user, userId } = useContext(AuthContext);

  const onAddNew = async () => {
    setLoading(true);
    try {
      if (name === "" || number === "") {
        setError("Enter Valid Name!");
        setLoading(false);
      } else {
        const newDocRef = firestore().collection("customers").doc();
        newDocRef.set({
          id: newDocRef.id,
          name: name,
          number: number,
          notes: notes,
          representative: user.phoneNumber,
          user_id: userId,
        });
        setName("");
        setNumber("");
        setNotes("");
        setError(null);
        setSuccess(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setError(e);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Customer</Text>
      {
        error ? (
          <View style={styles.error}>
            <Text style={styles.errorMsg}>{error}</Text>
          </View>
        ) : (<></>)
      }
      {
        success ? (
          <View style={styles.success}>
            <Text style={styles.successMsg}>Customer Added Successfully!</Text>
          </View>
        ) : (<></>)
      }
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          value={number}
          onChangeText={(number) => setNumber(number)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <TextInput
          placeholder="Notes"
          style={styles.input}
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
          textContentType="name"
        />
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={() => {
            onAddNew();
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Add New Customer</Text>
          )}
        </TouchableOpacity>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default NewCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20
  },
  text: {
    fontSize: 28,
    marginBottom: 25,
    color: "#051d5f",
  },
  error: {
    width: "100%",
    height: height/15,
    padding: 10,
    backgroundColor: "#F8D7DA",
    borderRadius: height/120,
    marginBottom: 15,
    justifyContent: "center"
  },
  errorMsg: {
    color: "#842029",
    fontSize: 12,
    textTransform: "capitalize",
  },
  success: {
    width: "100%",
    height: height/15,
    padding: 10,
    backgroundColor: "#D1E7DD",
    borderRadius: height/120,
    marginBottom: 15,
    justifyContent: "center"
  },
  successMsg: {
    color: "#0F5132",
    fontSize: 12,
    textTransform: "capitalize",
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
