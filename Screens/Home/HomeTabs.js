import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import PendingJob from "./PendingJob";
import Icon from "react-native-vector-icons/FontAwesome5";

const BottomTab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = "clipboard-list";
          } else if (route.name === "PendingJob") {
            iconName = "clock";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        style: { backgroundColor: "#D0F6F9", height: 55 },
      }}
    >
      <BottomTab.Screen
        options={{ title: "All Tasks" }}
        name="HomeStack"
        component={HomeStack}
      />
      <BottomTab.Screen
        options={{ title: "Pending Tasks" }}
        name="PendingJob"
        component={PendingJob}
      />
    </BottomTab.Navigator>
  );
};

export default HomeTabs;
