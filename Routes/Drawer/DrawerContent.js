import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Title, Caption, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../AuthProvider";

const DrawerContent = (props) => {
  const [focus, setFocus] = useState("Planner");
  const { logout, user } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title style={styles.title} numberOfLines={1}>
                  {user.displayName
                    ? `${user.displayName}`
                    : `${user.phoneNumber.substr(
                        0,
                        3
                      )} ${user.phoneNumber.substr(3, 12)}`}
                </Title>
                <Caption style={styles.caption}>
                  {user.displayName
                    ? `${user.phoneNumber.substr(
                        0,
                        3
                      )} ${user.phoneNumber.substr(3, 12)}`
                    : ``}
                </Caption>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Caption
                  style={{
                    color: "#0AB5C2",
                    fontSize: 12,
                    fontWeight: "bold",
                    lineHeight: 15,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: "#0AB5C2",
                    borderRadius: 3,
                    width: 85,
                    height: 25,
                  }}
                  onPress={() => {
                    props.navigation.navigate("Profile");
                  }}
                >
                  Edit Profile
                </Caption> */}
              </View>
            </View>
          </Drawer.Section>
          <Drawer.Section>
            {/* ATTENDANCE */}
            <DrawerItem
              focused={focus === "AttendanceStack"}
              activeTintColor="#0AB5C2"
              icon={({ color, size }) => (
                <Icon name="calendar-check" color={color} size={size} />
              )}
              label="Attendance"
              onPress={() => {
                props.navigation.navigate("AttendanceStack");
                setFocus("AttendanceStack");
              }}
            />
            {/* HOME */}
            <DrawerItem
              focused={focus === "HomeTabs"}
              activeTintColor="#0AB5C2"
              icon={({ color, size }) => (
                <Icon name="calendar-account" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("HomeTabs");
                setFocus("HomeTabs");
              }}
            />
            {/* NEW CUSTOMER */}
            <DrawerItem
              focused={focus === "NewCustomerStack"}
              activeTintColor="#0AB5C2"
              icon={({ color, size }) => (
                <Icon name="account-plus" color={color} size={size} />
              )}
              label="New Customer"
              onPress={() => {
                props.navigation.navigate("NewCustomerStack");
                setFocus("NewCustomerStack");
              }}
            />
            {/* SETTINGS */}
            {/* <DrawerItem
              focused={focus === "Settings"}
              activeTintColor="#0AB5C2"
              icon={({ color, size }) => (
                <Icon name="cellphone-settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
                setFocus("Settings");
              }}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          activeTintColor="#0AB5C2"
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => logout()}
        />
      </Drawer.Section>
      <Drawer.Section>
        <Text style={styles.muted}>Tracerz © 2022</Text>
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 0,
    color: "black",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 0,
    color: "black",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#e9e9e9",
    borderTopWidth: 1,
  },
  muted: {
    fontSize: 12,
    color: "grey",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
