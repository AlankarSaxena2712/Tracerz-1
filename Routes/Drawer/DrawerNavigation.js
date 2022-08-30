import "react-native-gesture-handler";
import React from "react";

import HomeTabs from "../../Screens/Home/HomeTabs";
import Profile from "../../Screens/Profile/Profile";
import Settings from "../../Screens/Settings/Settings";
import AttendanceStack from "../../Screens/Attendance/AttendanceStack";
import NewCustomerStack from "../../Screens/NewCustomer/NewCustomerStack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import DrawerContent from "./DrawerContent";
import ExpenseStack from "../../Screens/Expense/ExpenseStack";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} />
      )}
      drawerType="slide"
      initialRouteName="AttendanceStack"
      screenOptions={{
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            backgroundColor="red"
            underlayColor="transparent"
            onPress={() => {
              props.navigation.toggleDrawer();
            } }
          />
        ),
       }}
    >
    <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    <Drawer.Screen name="AttendanceStack" component={AttendanceStack} />
    <Drawer.Screen name="NewCustomerStack" component={NewCustomerStack} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="ExpenseStack" component={ExpenseStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
