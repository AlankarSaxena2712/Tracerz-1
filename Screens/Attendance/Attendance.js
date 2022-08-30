import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Title } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AuthContext } from "../../Routes/AuthProvider";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { StatusBar } from "expo-status-bar";
import firestore from "@react-native-firebase/firestore";

const LOCATION_TASK_NAME = "background-location-task";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = (width / height) * 2;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const [active, setActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const currentDate = new Date();

  const locRef = firestore()
    .collection("location")
    .doc("user_loc")
    .collection(`${user.phoneNumber}`)
    .doc(`${currentDate.getDate()}`);

  const locPathRef = firestore()
    .collection("location")
    .doc("user_loc")
    .collection(`${user.phoneNumber}`)
    .doc(`${currentDate.getDate()}_path`);

  const userRef = firestore().collection("userData").doc(`${user.phoneNumber}`);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access Location Denied!");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });
      setLocation(currentLocation);
      setLoading(false);
      console.log("Working...");
    })();
  }, []);

  const onSnippet = () => {
    setActive(!active);
    userRef.update({lastPunchIn: new Date()})
    ReactNativeForegroundService.add_task(
      () => {
        Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          showsBackgroundLocationIndicator: true,
          accuracy: Location.Accuracy.Highest,
          foregroundService: {
            notificationTitle: "Using your location",
            notificationColor: "#56849E",
          },
        });
      },
      {
        delay: 30000,
        onLoop: true,
        taskId: "taskid",
        onError: (e) => console.log(`Error logging:`, e),
      }
    );
    ReactNativeForegroundService.start({
      id: "taskid",
      title: "Foreground Service",
      message: "you are online!",
    });
  };

  const offSnippet = () => {
    setActive(!active);
    ReactNativeForegroundService.stop();
    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(
      (value) => {
        if (value) {
          Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        }
      }
    );
  };

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    const {
      locations: [
        {
          coords: { latitude, longitude },
        },
      ],
    } = data;
    try {
      const currentDate = new Date();
      locRef.set({ latitude, longitude, time: currentDate });
      locPathRef.set({
        path: firestore.FieldValue.arrayUnion({ latitude, longitude, time: currentDate }),
      }, { merge: true })
    } catch (err) {
      console.log(err);
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="black" size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />
      </View>
      <View style={styles.lower}>
        <Title style={styles.title}>
          {user.displayName
            ? `${user.displayName}${"\n"}${user.phoneNumber.substr(
              0,
              3
            )} ${user.phoneNumber.substr(3, 12)}`
            : `${user.phoneNumber.substr(0, 3)} ${user.phoneNumber.substr(
              3,
              12
            )}`}
        </Title>
        <TouchableOpacity
          style={[styles.button, active ? { backgroundColor: "#DC3545" } : {}]}
          onPress={() => {
            active ? offSnippet() : onSnippet();
          }}
        >
          <Text style={styles.buttonText}>
            {active ? "Punch Out" : "Punch In"}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upper: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  lower: {
    minHeight: 100,
    padding: 25,
    backgroundColor: "white",
    elevation: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#0095F6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "white",
    lineHeight: 15,
  },
});
