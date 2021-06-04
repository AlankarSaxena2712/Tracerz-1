import "react-native-gesture-handler";
import React from "react";

import HomeTabs from "../../Screens/Home/HomeTabs";
import Profile from "../../Screens/Profile/Profile";
import Settings from "../../Screens/Settings/Settings";
import AttendanceStack from "../../Screens/Attendance/AttendanceStack";
import NewCustomerStack from "../../Screens/NewCustomer/NewCustomerStack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} />
      )}
      drawerType="slide"
      initialRouteName="AttendanceStack"
    >
    <Drawer.Screen name="AttendanceStack" component={AttendanceStack} />
    <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    <Drawer.Screen name="NewCustomerStack" component={NewCustomerStack} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
