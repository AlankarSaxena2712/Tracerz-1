import "react-native-gesture-handler";
import React, { useContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "../Screens/Authentication/AuthStack";
import DrawerNavigation from "./Drawer/DrawerNavigation";

import { AuthContext } from "./AuthProvider";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, seInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      seInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
