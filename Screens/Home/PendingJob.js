import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appbar } from "react-native-paper";
import PendingJobsList from "./PendingJobsList";

const PendingJob = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar style={styles.bottom}>
        <Text style={styles.headTitle}>Pending Jobs</Text>
      </Appbar>
      <PendingJobsList navigation={navigation} />
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default PendingJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 88,
  },
  text: {
    color: "black",
    fontSize: 12,
  },
  bottom: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    paddingTop: 30,
    height: 88,
    backgroundColor: "#D0F6F9",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  headTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
