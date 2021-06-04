import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Card = ({
  navigation,
  id,
  title,
  description,
  latitude,
  longitude,
  date,
  completed,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Job", {
          id: id,
          title: title,
          description: description,
          latitude: latitude,
          longitude: longitude,
          date: date,
          completed: completed,
        })
      }
    >
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={4} style={styles.description}>
        {description}
      </Text>
      <Text
        numberOfLines={1}
        style={completed ? styles.completed : styles.pending}
      >
        {completed ? "COMPLETED" : "PENDING"}
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 28,
          right: 20,
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  completed: {
    marginTop: 15,
    color: "#08D066",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  pending: {
    marginTop: 15,
    color: "#F3363C",
    fontWeight: "bold",
    letterSpacing: 1,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    marginHorizontal: 5,
  },
  description: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 5,
  },
});
