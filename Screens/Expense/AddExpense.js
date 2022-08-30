import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../Routes/AuthProvider";

const { width, height } = Dimensions.get("window");

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { user, userId } = useContext(AuthContext);

  const onAddNew = async () => {
    setLoading(true);
    try {
      if (amount === "") {
        setError("Enter Valid Amount!");
        setLoading(false);
      } else if (reason === "") {
        setError("Enter Valid Reason!");
        setLoading(false);
      } else {
        const newDocRef = firestore().collection("expenses").doc();
        newDocRef.set({
          id: newDocRef.id,
          amount,
          reason,
          user: user.phoneNumber,
          user_id: userId,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
        setAmount("");
        setReason("");
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
      <Text style={styles.text}>Add New Expense</Text>
      {error ? (
        <View style={styles.error}>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : (
        <></>
      )}
      {success ? (
        <View style={styles.success}>
          <Text style={styles.successMsg}>Expense Added Successfully!</Text>
        </View>
      ) : (
        <></>
      )}
      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={amount}
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />
      <TextInput
        placeholder="Reason"
        style={styles.input}
        value={reason}
        onChangeText={(reason) => setReason(reason)}
        keyboardType="default"
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
          <Text style={styles.buttonText}>Add New Expense</Text>
        )}
      </TouchableOpacity>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 25,
    color: "#051d5f",
  },
  error: {
    width: "100%",
    height: height / 15,
    padding: 10,
    backgroundColor: "#F8D7DA",
    borderRadius: height / 120,
    marginBottom: 15,
    justifyContent: "center",
  },
  errorMsg: {
    color: "#842029",
    fontSize: 12,
    textTransform: "capitalize",
  },
  success: {
    width: "100%",
    height: height / 15,
    padding: 10,
    backgroundColor: "#D1E7DD",
    borderRadius: height / 120,
    marginBottom: 15,
    justifyContent: "center",
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
