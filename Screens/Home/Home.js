import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import CardList from "./CardList";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CardList navigation={navigation} />
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;

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
