import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 12,
  },
});
