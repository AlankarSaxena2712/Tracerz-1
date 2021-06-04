import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Attendance from "./Attendance";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

const AttendanceStack = ({
  navigation,
}) => {
  return (
    <Stack.Navigator mode={"modal"} initialRouteName="Attendance">
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { textTransform: "uppercase", fontWeight: "bold" },
          title: "Attendance",
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
    </Stack.Navigator>
  );
};

export default AttendanceStack;
