import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  RefreshControl,
} from "react-native";
import Card from "./Card";
import firestore from "@react-native-firebase/firestore";

const PendingTaskList = ({ navigation }) => {
  const [jobData, setJobData] = useState();
  const [initializing, setInitializing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const getJobList = () => {
    let temp = [];
    firestore()
      .collection("jobs")
      .where("completed", "==", false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnap) => {
          temp.push(documentSnap.data());
        });
        setJobData(temp);
      })
      .then(setInitializing(false));
  };

  useFocusEffect(
    useCallback(() => {
      getJobList();
    }, [])
  );

  const refreshSwipe = async () => {
    setRefreshing(true);
    getJobList();
    wait(1000).then(() => setRefreshing(false));
  };

  const onRefresh = useCallback(() => {
    refreshSwipe();
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="black" size={30} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {jobData?.map((item) => (
        <Card
          key={item._id}
          id={item._id}
          title={item.title}
          description={item.description}
          latitude={item.location._latitude}
          longitude={item.location._longitude}
          date={`${item.date.toDate().getDate()}-${
            item.date.toDate().getMonth() + 1
          }-${item.date.toDate().getFullYear()}`}
          completed={item.completed}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default PendingTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
