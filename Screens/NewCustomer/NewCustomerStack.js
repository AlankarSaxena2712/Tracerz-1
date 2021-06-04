import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import NewCustomer from "./NewCustomer";
import CustomerList from "./CustomerList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const First = ({ navigation }) => {
  return (
    <Stack.Navigator mode={"modal"}>
      <Stack.Screen
        name="NewCustomer"
        component={NewCustomer}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { textTransform: "uppercase", fontWeight: "bold" },
          title: "Add Customer",
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
        name="CustomerList"
        component={CustomerList}
        options={{
          headerStyle: {
            elevation: 3,
            backgroundColor:"#D0F6F9"
          },
          headerTitleAlign: "center",
          headerTitleStyle: { textTransform: "uppercase", fontWeight: "bold" },
          title: "Customer List",
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

const NewCustomerBottomTab = ({
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
      initialRouteName="NewCustomer"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "NewCustomer") {
            iconName = "account-plus";
          } else if (route.name === "CustomerList") {
            iconName = "format-list-bulleted";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        style: {backgroundColor:"#D0F6F9", height: 55}
      }}
    >
      <BottomTab.Screen
        options={{ title: "Add Customer" }}
        name="NewCustomer"
        component={First}
      />
      <BottomTab.Screen
        options={{ title: "Customer List" }}
        name="CustomerList"
        component={Second}
      />
    </BottomTab.Navigator>
  );
};

export default NewCustomerBottomTab;
