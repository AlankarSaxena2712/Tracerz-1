import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const First = ({ navigation }) => {
  return (
    <Stack.Navigator mode={"modal"}>
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { textTransform: "uppercase", fontWeight: "bold" },
          title: "Add Expense",
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
const Second = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpenseList"
        component={ExpenseList}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { textTransform: "uppercase", fontWeight: "bold" },
          title: "Expense List",
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

const ExpenseBottomTab = ({
  title,
  description,
  latitude,
  longitude,
  date,
  completed,
  navigation,
}) => {
  return (
    <BottomTab.Navigator
      initialRouteName="AddExpense"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "AddExpense") {
            iconName = "add-circle";
          } else if (route.name === "ExpenseList") {
            iconName = "format-list-bulleted";
          }
          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        style: {backgroundColor:"#D0F6F9", height: 55}
      }}
    >
      <BottomTab.Screen
        options={{ title: "Add Expense" }}
        name="AddExpense"
        component={First}
      />
      <BottomTab.Screen
        options={{ title: "Expense List" }}
        name="ExpenseList"
        component={Second}
      />
    </BottomTab.Navigator>
  );
};

export default ExpenseBottomTab;
