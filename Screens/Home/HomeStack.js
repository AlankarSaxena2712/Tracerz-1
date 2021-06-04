import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Job from "./Job";
import JobComplete from "./JobComplete";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

const HomeStack = ({
  navigation,
}) => {
  return (
    <Stack.Navigator mode={"modal"} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, textTransform: "uppercase", fontWeight: "bold" },
          title: "Tasks",
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              color="black"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Job"
        component={Job}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            elevation: 5,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, textTransform: "uppercase", fontWeight: "bold" },
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={30}
              color="black"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="JobComplete"
        component={JobComplete}
        options={({ route }) => ({
          title: `${route.params.title}`,
          headerStyle: {
            elevation: 0,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 18, textTransform: "uppercase", fontWeight: "bold" },
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={25}
              color="black"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
