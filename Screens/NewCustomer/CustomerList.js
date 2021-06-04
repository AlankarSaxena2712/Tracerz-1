import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const CustomerCard = ({ name, number, id }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#D0D0D0",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "black",
          textTransform: "uppercase",
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#666",
          textTransform: "uppercase",
        }}
      >
        {number}
      </Text>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

const CustomerList = ({ navigation }) => {
  const [customerList, setCustomerList] = useState();
  const [initializing, setInitializing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const refreshSwipe = async () => {
    setInitializing(true);
    getCustomerList();
    wait(2000).then(() => setInitializing(false));
  };

  const onRefresh = useCallback(() => {
    refreshSwipe();
  }, []);

  const getCustomerList = () => {
    let temp = [];
    firestore()
      .collection("customers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnap) => {
          temp.push(documentSnap.data());
        });
        setCustomerList(temp);
      })
      .then(setInitializing(false));
  };

  useFocusEffect(
    useCallback(() => {
      getCustomerList();
      console.log("TRIGERED!");
    }, [])
  );

  if (initializing) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActivityIndicator
          style={{
            position: "absolute",
            top: height / 2 - 15,
            left: width / 2 - 15,
          }}
          color="black"
          size={30}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {customerList?.map((customer) => (
        <CustomerCard
          id={customer.id}
          name={customer.name}
          number={customer.number}
          key={customer.id}
        />
      ))}
    </ScrollView>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
});
