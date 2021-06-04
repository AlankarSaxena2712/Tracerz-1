import React from "react";

import Login from "./Login";
import OTP from "./OTP";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
};

export default AuthStack;