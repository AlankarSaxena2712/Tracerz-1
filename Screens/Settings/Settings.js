import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Settings;

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
